import React, {memo} from 'react';
import Toast, {ToastConfig} from 'react-native-toast-message';
import {StyleSheet, Text, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {Shadow} from 'react-native-shadow-2';
import {Colors} from '@/themes/colors';

interface Config {
  props: Props;
}

interface Props extends ViewProps {
  text?: string;
}

const config: ToastConfig = {
  success: ({props}: Config) => (
    <Shadow
      viewStyle={styles.Shadow}
      containerViewStyle={styles.ShadowContainer}>
      <SuccessContainer>
        <Text>{props.text}</Text>
      </SuccessContainer>
    </Shadow>
  ),
  error: ({props}: Config) => (
    <Shadow
      viewStyle={styles.Shadow}
      containerViewStyle={styles.ShadowContainer}>
      <ErrorContainer>
        <Text>{props.text}</Text>
      </ErrorContainer>
    </Shadow>
  ),
};

export const CustomToast = memo(() => {
  return <Toast config={config} />;
});

const BORDER_RADIUS = 16;

const SuccessContainer = styled.View`
  background-color: ${Colors.GREEN_LIGHT};
  border-radius: ${BORDER_RADIUS}px;
  padding: 16px 16px;
`;

const ErrorContainer = styled.View`
  background-color: ${Colors.RED_LIGHT};
  border-radius: ${BORDER_RADIUS}px;
  padding: 16px 16px;
`;

const styles = StyleSheet.create({
  Shadow: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
  },
  ShadowContainer: {
    width: '80%',
    alignItems: 'center',
  },
});
