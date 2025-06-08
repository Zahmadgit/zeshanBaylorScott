import React from 'react';

import {SafeAreaView, StyleSheet, Text} from 'react-native';
import HospitalData from './components/HospitalData/HospitalData';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text>Yay its working</Text>
      <Text>BRUH WORKS</Text>
      <HospitalData />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
