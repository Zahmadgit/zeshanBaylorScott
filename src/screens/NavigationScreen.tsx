import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HospitalDataScreen from './HospitalDataScreen';
import HospitalDetails from '../components/HospitalDetails/HospitalDetails';

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HospitalData"
        component={HospitalDataScreen}
        options={{ title: 'Hospitals', headerShown: false }}
      />
      <Stack.Screen
        name="HospitalDetails"
        component={HospitalDetails}
        options={({ route }) => ({
          // Dynamically set the header title using hospital name, flashy~
          title: route.params?.hospitalData?.hospital_name || 'Hospital Details',
        })}
      />
    </Stack.Navigator>
  );
};

export default NavigationScreen;
