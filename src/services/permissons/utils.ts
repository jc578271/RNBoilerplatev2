import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Platform} from 'react-native';

export const checkPermissions = async (callback?: () => void) => {
  const permissions = (): Permission[] => {
    if (Platform.OS == 'android') {
      return [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.CAMERA,
      ];
    }
    if (Platform.OS == 'ios') {
      return [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.CAMERA];
    }
    return [];
  };

  for (let permission of permissions()) {
    await requestPermission(permission);
  }
  if (callback) callback();
};

export const requestPermission = async (
  permission: Permission,
  callback?: (isGranted?: boolean) => void,
) => {
  let isGranted: boolean = false;

  await check(permission).then(async result => {
    isGranted = result == RESULTS.GRANTED;

    if (!isGranted) {
      await request(permission);
    }
  });
  if (callback) callback(isGranted);

  return isGranted;
};
