import * as React from 'react';
import {memo} from 'react';
import {Text, TouchableOpacity,} from 'react-native';
import {RouteProp, useNavigation,} from '@react-navigation/native';
import {bottomSpaceHeight} from '@/themes/styles';
import styled from 'styled-components/native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useKeyboard} from '@/hooks/useKeyboard';

interface Props extends BottomTabBarProps {
  mainRoute: RouteProp<any>;
}

// @ts-ignore
export const Footer = memo(({descriptors, state, mainRoute}: Props) => {
  const navigation = useNavigation<any>();
  // console.log(
  //   'state: ',
  //   state.routes.map(item => descriptors[item.key].route.name),
  //   state.index,
  // );
  const {isShown} = useKeyboard();

  return (
    !isShown && (
      <Container>
        <Text>Footer</Text>
        {state.routes.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate(descriptors[item.key].route.name)
            }>
            <Text>
              {descriptors[item.key].route.name}{' '}
              {index == state.index && 'current'}
            </Text>
          </TouchableOpacity>
        ))}
      </Container>
    )
  );
});

const Container = styled.View`
  padding-bottom: ${bottomSpaceHeight}px;
`;
