import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationScreen from '../screens/NavigationScreen';
import FlaggedHospitalsScreen from '../screens/FlaggedHospitalsScreen';

type TabParamList = {
  Hospitals: undefined;
  Flagged: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen
        name="Hospitals"
        component={NavigationScreen}
        options={{
          tabBarLabel: 'Hospitals',
        }}
      />
      <Tab.Screen
        name="Flagged"
        component={FlaggedHospitalsScreen}
        options={{
          tabBarLabel: 'Flagged',
        }}
      />
    </Tab.Navigator>
  );
}
