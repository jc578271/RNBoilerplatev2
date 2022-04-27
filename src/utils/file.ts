import RNFS from 'react-native-fs';

export const binaryImage = async (uri: string) => {
  return await RNFS.readFile(uri, 'base64');
};
