import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './store/store';
import PlatformNavigation from './navigation/PlatformNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlatformNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
