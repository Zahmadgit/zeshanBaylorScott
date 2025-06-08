import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NavigationScreen from './screens/NavigationScreen';
import FlaggedHospitalsScreen from './screens/FlaggedHospitalsScreen';

type RootStackParamList = {
  NavigationScreen: undefined;
  FlaggedHospitals: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="NavigationScreen" component={NavigationScreen} />
          <Stack.Screen 
            name="FlaggedHospitals" 
            component={FlaggedHospitalsScreen}
            options={{ 
              headerShown: true,
              title: 'Flagged Hospitals'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
