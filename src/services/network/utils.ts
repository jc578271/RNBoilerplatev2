import NetInfo from '@react-native-community/netinfo';

export const requestNet = async () => {
  console.log('net...');
  NetInfo.fetch().then(state => {

  });
};
