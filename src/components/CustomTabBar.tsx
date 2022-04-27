import React, {memo, useCallback} from 'react';
import {TabBarProps} from 'react-native-scrollable-tab-view';
import {Animated, StyleSheet} from 'react-native';
import {Colors} from '@/themes/colors';
import styled from 'styled-components/native';
import Fonts from '@/themes/fonts';

interface TabProps {
  item: string | Element;
  index: number;
  goToPage?: ((pageNumber: number) => void) | undefined;
  activeTab: number | undefined;
}
const TabItem = memo(({item, index, goToPage, activeTab}: TabProps) => {
  const _goToPage = useCallback(() => {
    goToPage?.(index);
  }, []);
  return (
    <TabBtn onPress={_goToPage} key={index}>
      <TabText isActive={activeTab == index}>{item}</TabText>
    </TabBtn>
  );
});

interface Props extends TabBarProps {}

export const CustomTabBar = memo((props: Props) => {
  const {scrollValue, containerWidth, tabs, goToPage, activeTab} = props;
  const numberOfTabs = tabs?.length || 1;
  const _containerWidth = containerWidth || 0;

  const tabUnderlineStyle = {
    width: _containerWidth / numberOfTabs,
  };

  const translateX =
    scrollValue?.interpolate({
      inputRange: [0, 1],
      outputRange: [0, _containerWidth / numberOfTabs],
    }) || 0;

  return (
    <Container>
      <TabWrap>
        {tabs?.map((item, index) => (
          <TabItem
            goToPage={goToPage}
            item={item}
            index={index}
            activeTab={activeTab}
          />
        ))}
      </TabWrap>

      <Animated.View
        style={[
          tabUnderlineStyle,
          {transform: [{translateX}]},
          style.underlineBar,
        ]}
      />
    </Container>
  );
});

const Container = styled.View`
  background-color: ${Colors.WHITE};
  border-bottom-width: 8px;
  border-bottom-color: ${Colors.GREY_6};
`;
const TabWrap = styled.View`
  flex-direction: row;
`;
const TabBtn = styled.TouchableOpacity`
  padding: 13px;
  flex: 1;
  align-items: center;
`;

const TabText = styled.Text<{isActive?: boolean}>`
  font-family: ${Fonts.medium};
  font-size: 15px;
  color: ${p => (p.isActive ? Colors.defaultColor : Colors.GREY_3)};
`;

const style = StyleSheet.create({
  underlineBar: {
    height: 2,
    backgroundColor: Colors.defaultColor,
  },
});
