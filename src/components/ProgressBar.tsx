import React, {memo, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Animated, Easing, Text, ViewProps} from 'react-native';

interface Props extends ViewProps {
  progress?: number;
  color?: string;
}

export const ProgressBar = memo(({color, progress, ...rest}: Props) => {
  return (
    <Container {...rest}>
      <Progress color={color} progress={progress} />
    </Container>
  );
});

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Progress = styled(Animated.View)<{progress?: number; color?: string}>`
  background-color: ${p => p.color};
  height: 100%;
  width: ${p => (p?.progress || 0) * 100}%;
`;
