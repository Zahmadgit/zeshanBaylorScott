
import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';


function App(): React.JSX.Element {

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text>Yay its working</Text>
      <Text>BRUH WORKS</Text>
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
