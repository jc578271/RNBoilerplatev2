import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {InteractionManager} from 'react-native';

const useTimeout = (timeLocked = 0, deps?: any[]) => {
  useEffect(() => {
    const handle = InteractionManager.createInteractionHandle();
    setTimeout(
      () => InteractionManager.clearInteractionHandle(handle),
      timeLocked,
    );
    return () => InteractionManager.clearInteractionHandle(handle);
  }, deps && [...deps]);
};

export const useInteractionManager = (
  timeLocked: number,
  deps?: any[],
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isMounted, setMounted] = useState(false);
  useTimeout(timeLocked);

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() =>
      setMounted(true),
    );
    return () => interaction?.cancel();
  }, deps && [...deps]);

  return [isMounted, setMounted];
};
