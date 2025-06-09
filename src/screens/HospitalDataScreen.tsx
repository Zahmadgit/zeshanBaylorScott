import React from 'react';
import { View, StyleSheet } from 'react-native';
import HospitalData from '../components/HospitalData/HospitalData';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation: any;
  route: any;
}

const HospitalDataScreen = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <HospitalData navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HospitalDataScreen;
