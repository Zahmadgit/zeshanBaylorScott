import React from 'react';
import { View, StyleSheet } from 'react-native';
import FlaggedHospitals from '../components/FlaggedHospitals/FlaggedHospitals';

const FlaggedHospitalsScreen = () => {
  return (
    <View style={styles.container}>
      <FlaggedHospitals />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FlaggedHospitalsScreen;
