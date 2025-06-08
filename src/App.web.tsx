import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import HospitalData from './components/HospitalData/HospitalData';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text>Yay its working</Text>
          <Text>BRUH WORKS WEB</Text>
          <HospitalData />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
