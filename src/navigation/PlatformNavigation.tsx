import React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './TabNavigator';
import TopTabNavigator from './TopTabNavigator';

// Define types for the navigation stack's routes for type safety
type RootStackParamList = {
  TabNavigator: undefined;
  NavigationScreen: undefined;
  FlaggedHospitals: undefined;
};

// Create the native stack navigator with typed route params
const Stack = createNativeStackNavigator<RootStackParamList>();

const PlatformNavigation = () => {
  // Select different tab navigator components based on the platform:
  // Use top tabs for web and bottom tabs for native platforms by default
  const TabNavigator = Platform.select({
    web: TopTabNavigator,
    default: BottomTabNavigator,
  });

  return (
    // Setup the stack navigator without headers, rendering the platform-specific tabs
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default PlatformNavigation;
