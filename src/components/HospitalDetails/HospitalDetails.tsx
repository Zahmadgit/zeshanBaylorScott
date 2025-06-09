import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {addFlaggedHospital, removeFlaggedHospital} from '../../store/flaggedHospitalsSlice';
import Header from './components/Header';
import Stats from './components/Stats';
import Chart from './components/Chart';
import Occupancy from './components/Occupancy';

type RootStackParamList = {
  HospitalList: undefined;
  HospitalDetails: {hospitalData: any};
  FlaggedHospitals: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'HospitalDetails'>;

const HospitalDetails = ({route, navigation}: Props) => {
  const {hospitalData} = route.params;
  const dispatch = useAppDispatch();
  const {flaggedHospitals} = useAppSelector((state) => state.flaggedHospitals);

  const isFlagged = flaggedHospitals.some(
    (h: any) => h.id === hospitalData.hospital_pk
  );

  const toggleFlag = () => {
    if (isFlagged) {
      dispatch(removeFlaggedHospital(hospitalData.hospital_pk));
    } else {
      dispatch(
        addFlaggedHospital({
          id: hospitalData.hospital_pk,
          hospital_name: hospitalData.hospital_name,
          hospital_state: hospitalData.hospital_state,
          collection_week: hospitalData.collection_week,
        })
      );
    }
  };

  if (!hospitalData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No hospital data available</Text>
      </View>
    );
  }

  const totalBeds = parseFloat(
    hospitalData.all_adult_hospital_inpatient_beds_7_day_avg,
  );
  const occupiedBeds = parseFloat(
    hospitalData.all_adult_hospital_inpatient_bed_occupied_7_day_avg,
  );

  // Check if the data is valid
  if (isNaN(totalBeds) || isNaN(occupiedBeds) || totalBeds <= 0) {
    return (
      <View style={styles.container}>
        <Header hospitalData={hospitalData} navigation={navigation} toggleFlag={toggleFlag} isFlagged={isFlagged} />
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            No chart data available
            {'\n'}Total: {totalBeds}, Occupied: {occupiedBeds}
          </Text>
        </View>
      </View>
    );
  }

  const availableBeds = totalBeds - occupiedBeds;

  return (
    <View style={styles.container}>
      <Header hospitalData={hospitalData} navigation={navigation} toggleFlag={toggleFlag} isFlagged={isFlagged} />
      <Stats
        totalBeds={totalBeds}
        occupiedBeds={occupiedBeds}
        availableBeds={availableBeds}
      />
      <Chart totalBeds={totalBeds} occupiedBeds={occupiedBeds} />
      <Occupancy totalBeds={totalBeds} occupiedBeds={occupiedBeds} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default HospitalDetails;
