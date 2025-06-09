import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import FlaggedHospitals from '../components/FlaggedHospitals/FlaggedHospitals';

const FlaggedHospitalsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlaggedHospitals />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FlaggedHospitalsScreen;
