import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './store/store';
import PlatformNavigation from './navigation/PlatformNavigation';

// URL linking config for web navigation, web apps love this one simple trick
const linking = {
  config: {
    screens: {
      TabNavigator: {
        screens: {
          Hospitals: {
            screens: {
              HospitalData: 'hospitals',
              HospitalDetails: 'hospitals/details',
            },
          },
          Flagged: 'flagged',
        },
      },
    },
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <PlatformNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
