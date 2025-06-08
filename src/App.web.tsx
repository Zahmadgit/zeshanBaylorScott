import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HospitalData from './components/HospitalData/HospitalData';
import HospitalDetails from './components/HospitalDetails/HospitalDetails';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HospitalList">
          <Stack.Screen
            name="HospitalList"
            component={HospitalData}
            options={{
              title: 'Hospitals',
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#000',
            }}
          />
          <Stack.Screen
            name="HospitalDetails"
            component={HospitalDetails}
            options={({route}) => ({
              title:
                route.params?.hospitalData?.hospital_name || 'Hospital Details',
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#000',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
