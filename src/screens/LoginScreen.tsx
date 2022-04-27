import * as React from 'react';
import {memo, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {statusBarHeight} from '@/themes/styles';
import {createReplace} from '@/utils/navigation';
import {requestLogin} from '@/store/constant/functions';
import {useAsyncFn} from 'react-use';
import {Text, TouchableOpacity} from "react-native";

export const LoginScreen = memo(function HomeScreen() {
  const [params, setParams] = useState({
    email: '',
    password: '',
  });

  const [{loading}, _requestLogin] = useAsyncFn(async () => {
    await requestLogin({
      email: params.email, // hoang.nguyen@platform.inc
      password: params.password, //123456
    });
  }, [params]);

  const loginOnPress = useCallback(async () => {
    await _requestLogin();
  }, [params]);

  return (
    <Container>
      <TouchableOpacity onPress={() => createReplace('DrawerStack')()}>
        <Text>Hello</Text>
      </TouchableOpacity>
    </Container>
  );
});

const Container = styled.View`
  padding-top: ${statusBarHeight + 15}px;
`;