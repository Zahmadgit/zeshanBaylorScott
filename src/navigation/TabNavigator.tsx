import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationScreen from '../screens/NavigationScreen';
import FlaggedHospitalsScreen from '../screens/FlaggedHospitalsScreen';
import HospitalTabIcon from '../components/common/tabIconsComponents/HospitalTabIcon';
import FlaggedTabIcon from '../components/common/tabIconsComponents/FlaggedTabIcon';

// Define the tabs and their params (none needed here)
type TabParamList = {
  Hospitals: undefined;
  Flagged: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
// TODO: add swipe gestures for tab navigation
const TabNavigator = () => {
  return (
    // Set up the bottom tab navigator with custom active/inactive colors
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue', // blue's more vibrant than green
        tabBarInactiveTintColor: 'gray', // gray when inactive
      }}>
      <Tab.Screen
        name="Hospitals"
        component={NavigationScreen}
        options={{
          tabBarLabel: 'Hospitals',
          headerShown: false, // hide header for clean look
          tabBarIcon: HospitalTabIcon,
        }}
      />
      <Tab.Screen
        name="Flagged"
        component={FlaggedHospitalsScreen}
        options={{
          tabBarLabel: 'Flagged',
          headerShown: false, // no header here either
          tabBarIcon: FlaggedTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
