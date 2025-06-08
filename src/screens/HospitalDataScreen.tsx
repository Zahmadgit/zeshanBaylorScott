import React from 'react';
import { View, StyleSheet } from 'react-native';
import HospitalData from '../components/HospitalData/HospitalData';

const HospitalDataScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HospitalData navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HospitalDataScreen;
