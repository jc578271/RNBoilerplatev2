import React, {memo, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {LoginScreen} from '@/screens/LoginScreen';
import {Header} from '@/components/Header';
import {navigationRef,} from '@/utils/navigation';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {CustomTabBar} from '@/components/CustomTabBar';
import {TabScreen1} from "@/screens/TabScreen1";
import {TabScreen2} from "@/screens/TabScreen2";
import { DrawerScreen1 } from '@/screens/DrawerScreen1';
import { CustomDrawer } from '@/components/CustomDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

let tabViewRef: React.MutableRefObject<ScrollableTabView | null>;

const TabStack = memo((props: any) => {
  tabViewRef = useRef<ScrollableTabView | null>(null);
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <Stack.Screen name={'TabView'}>
        {() => (
          <ScrollableTabView
            ref={tabViewRef}
            renderTabBar={() => <CustomTabBar />}>
            <TabScreen1 tabLabel="TabScreen1" />
            <TabScreen2 tabLabel="TabScreen2" />
          </ScrollableTabView>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
});

export {tabViewRef};

const DrawerStack = () => {
  const route = useRoute();
  return (
    <Drawer.Navigator
      screenOptions={{drawerType: 'front'}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen options={{headerShown: false}} name={'TabStack'}>
        {props => <TabStack {...props} mainRoute={route} />}
      </Drawer.Screen>
      <Drawer.Screen name={'DrawerScreen1'} component={DrawerScreen1} />
    </Drawer.Navigator>
  );
};

export const Routes = memo(function Router() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
          <Stack.Screen name={'DrawerStack'} component={DrawerStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
});
