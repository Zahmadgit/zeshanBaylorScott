import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HospitalDataScreen from './HospitalDataScreen';
import HospitalDetails from '../components/HospitalDetails/HospitalDetails';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  NavigationScreen: undefined;
  HospitalData: undefined;
  HospitalDetails: { hospitalData: { hospital_name: string } };
};

const NavigationScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HospitalData"
        component={HospitalDataScreen}
        options={{ title: 'Hospitals' }}
      />
      <Stack.Screen
        name="HospitalDetails"
        component={HospitalDetails}
        options={({ route }) => ({
          title: route.params?.hospitalData?.hospital_name || 'Hospital Details',
        })}
      />
    </Stack.Navigator>
  );
};

export default NavigationScreen;
