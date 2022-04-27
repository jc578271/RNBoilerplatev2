import {createNavigationContainerRef, StackActions,} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export const navigation = () => navigationRef.current!;

export const createNavigate =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().navigate(screenName, params);
  };

export const createPush =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.push(screenName, params));
  };

export const createReplace =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.replace(screenName, params));
  };
