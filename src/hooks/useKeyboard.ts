import {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';

export const useKeyboard = () => {
  const [isShown, setShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {

    const keyboardShow = Keyboard.addListener('keyboardWillShow', e => {
      setShown(true);
      if (Platform.OS == 'ios') setKeyboardHeight(e.endCoordinates.height);
    });

    const keyboardHide = Keyboard.addListener('keyboardWillHide', () => {
      setShown(false);
      if (Platform.OS == 'ios') setKeyboardHeight(0);
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, [isShown, keyboardHeight]);

  return {isShown, keyboardHeight};
};
