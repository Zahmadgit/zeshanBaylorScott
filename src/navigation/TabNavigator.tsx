import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationScreen from '../screens/NavigationScreen';
import FlaggedHospitalsScreen from '../screens/FlaggedHospitalsScreen';

// Define the tabs and their params (none needed here)
type TabParamList = {
  Hospitals: undefined;
  Flagged: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    // Set up the bottom tab navigator with custom active/inactive colors
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'green',  // green when active
        tabBarInactiveTintColor: 'gray',   // gray when inactive
      }}
    >
      <Tab.Screen
        name="Hospitals"
        component={NavigationScreen}
        options={{
          tabBarLabel: 'Hospitals', 
          headerShown: false,  // hide header for clean look
        }}
      />
      <Tab.Screen
        name="Flagged"
        component={FlaggedHospitalsScreen}
        options={{
          tabBarLabel: 'Flagged', 
          headerShown: false,  // no header here either
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
