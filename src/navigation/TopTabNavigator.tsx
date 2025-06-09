import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NavigationScreen from '../screens/NavigationScreen';
import FlaggedHospitalsScreen from '../screens/FlaggedHospitalsScreen';

type TabParamList = {
  Hospitals: undefined;
  Flagged: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

const TopTabNavigator = () =>{
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

export default TopTabNavigator;
