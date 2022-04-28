import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from 'react-native-iphone-x-helper';
import {StatusBar} from 'react-native';

export const statusBarHeight = isIphoneX()
  ? getStatusBarHeight()
  : StatusBar.currentHeight || 20;

export const bottomSpaceHeight = isIphoneX() ? getBottomSpace() : 16;

export enum TxtBtnPos {
  start = 'flex-start',
  end = 'flex-end',
  center = 'center',
}
