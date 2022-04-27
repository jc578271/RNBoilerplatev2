import React from 'react';
import {RNCamera, TakePictureOptions} from 'react-native-camera';

interface TakingPicture {
  cameraRef: React.MutableRefObject<RNCamera | null>;
}

const options: TakePictureOptions = {
  width: 400,
  mirrorImage: true,
  fixOrientation: true,
  forceUpOrientation: true,
};

export const takePicture = async ({cameraRef}: TakingPicture) => {
  let isTaking = false;
  let data: any;

  if (cameraRef.current && !isTaking) {
    isTaking = true;
    try {
      data = await cameraRef.current?.takePictureAsync(options);
    } catch (e) {
      console.log('Error: ', e);
    } finally {
      isTaking = false;
    }
  }

  return {data, isTaking};
};
