import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './TabNavigator';
import TopTabNavigator from './TopTabNavigator';

type RootStackParamList = {
  TabNavigator: undefined;
  NavigationScreen: undefined;
  FlaggedHospitals: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function PlatformNavigation() {
  const TabNavigator = Platform.select({
    web: TopTabNavigator,
    default: BottomTabNavigator,
  });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
}
