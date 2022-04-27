import * as React from 'react';
import {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {statusBarHeight} from '@/themes/styles';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  state?: any;
  descriptors?: any;
}

export const CustomDrawer = memo(({state, descriptors}: Props) => {
  const navigation = useNavigation<any>();
  // console.log(
  //   'state: ',
  //   state.routes.map(item => descriptors[item.key].route.name),
  //   state.index,
  // );
  return (
    <Container>
      <Text>Drawer</Text>
      {state.routes.map((item:any, index:number) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(descriptors[item.key].route.name)}>
          <Text>
            {descriptors[item.key].route.name}{' '}
            {index == state.index && 'current'}
          </Text>
        </TouchableOpacity>
      ))}
    </Container>
  );
});

const Container = styled.View`
  padding-top: ${statusBarHeight+15}px;
`;
