import * as React from 'react';
import {memo} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {statusBarHeight} from '@/themes/styles';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

interface Props extends NativeStackHeaderProps {}

export const Header = memo(function ({navigation}: Props) {
  return (
    <Container>
      <Text>Header</Text>
    </Container>
  );
});

const Container = styled.View`
  padding-top: ${statusBarHeight+15}px;
`;
