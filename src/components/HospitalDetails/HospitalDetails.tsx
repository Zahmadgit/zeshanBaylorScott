import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  addFlaggedHospital,
  removeFlaggedHospital,
} from '../../store/flaggedHospitalsSlice';
import Header from './components/Header';
import Stats from './components/Stats';
import Chart from './components/Chart';
import Occupancy from './components/Occupancy';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

type RootStackParamList = {
  HospitalList: undefined;
  HospitalDetails: {hospitalData: any};
  FlaggedHospitals: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'HospitalDetails'>;

const HospitalDetails = ({route, navigation}: Props) => {
  const {hospitalData} = route.params;
  const dispatch = useAppDispatch();
  const {flaggedHospitals} = useAppSelector(state => state.flaggedHospitals);

  const isFlagged = flaggedHospitals.some(
    (h: any) => h.id === hospitalData.hospital_pk,
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
        }),
      );
    }
  };

  if (!hospitalData) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        accessible={true}
        accessibilityLabel="Hospital details view"
        accessibilityHint="Shows detailed information about the selected hospital">
        <Text
          style={styles.errorText}
          accessibilityLabel="No hospital data available">
          No hospital data available
        </Text>
      </ScrollView>
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        accessible={true}
        accessibilityLabel="Hospital details view"
        accessibilityHint="Shows detailed information about the selected hospital">
        <Header
          hospitalData={hospitalData}
          navigation={navigation}
          toggleFlag={toggleFlag}
          isFlagged={isFlagged}
        />
        <View
          style={styles.noDataContainer}
          accessible={true}
          accessibilityLabel="No chart data available">
          <Text style={styles.noDataText}>
            No chart data available
            {'\n'}Total: {totalBeds}, Occupied: {occupiedBeds}
          </Text>
        </View>
      </ScrollView>
    );
  }

  const availableBeds = totalBeds - occupiedBeds;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      accessible={true}
      accessibilityLabel={`Hospital details for ${hospitalData.hospital_name}`}
      accessibilityHint="Shows detailed information about the selected hospital">
      <Header
        hospitalData={hospitalData}
        navigation={navigation}
        toggleFlag={toggleFlag}
        isFlagged={isFlagged}
      />
      <Stats
        totalBeds={totalBeds}
        occupiedBeds={occupiedBeds}
        availableBeds={availableBeds}
      />
      <Chart totalBeds={totalBeds} occupiedBeds={occupiedBeds} />
      <Occupancy totalBeds={totalBeds} occupiedBeds={occupiedBeds} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  errorText: {
    fontSize: moderateScale(16),
    color: '#dc3545',
    textAlign: 'center',
    padding: moderateScale(16),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(16),
  },
  noDataText: {
    fontSize: moderateScale(16),
    color: '#666',
    textAlign: 'center',
  },
});

export default HospitalDetails;
