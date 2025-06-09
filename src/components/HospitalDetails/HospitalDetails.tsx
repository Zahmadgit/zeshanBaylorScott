import React from 'react';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
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
import {moderateScale, verticalScale} from 'react-native-size-matters';

const isWeb = Platform.OS === 'web';
const maxContentWidth = 1200; // Maximum width for web content

// Type definitions for navigation, hospital data, and flagged hospitals
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

  // Check if this hospital is already flagged
  const isFlagged = flaggedHospitals.some(
    (h: any) => h.id === hospitalData.hospital_pk,
  );

  // Toggle flag for this hospital, if it's already flagged, remove it, otherwise add it
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

  // Parse the total and occupied beds from the hospital data string to numbers
  const totalBeds = parseFloat(
    hospitalData.all_adult_hospital_inpatient_beds_7_day_avg,
  );
  const occupiedBeds = parseFloat(
    hospitalData.all_adult_hospital_inpatient_bed_occupied_7_day_avg,
  );

  // Render the content of the hospital details page based on validity and availabe
  const renderContent = () => {
    if (!hospitalData) {
      return (
        <Text
          style={styles.errorText}
          accessibilityLabel="No hospital data available">
          No hospital data available
        </Text>
      );
    }

    if (isNaN(totalBeds) || isNaN(occupiedBeds) || totalBeds <= 0) {
      return (
        <>
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
        </>
      );
    }

    const availableBeds = totalBeds - occupiedBeds;

    return (
      <>
        <Header
          hospitalData={hospitalData}
          navigation={navigation}
          toggleFlag={toggleFlag}
          isFlagged={isFlagged}
        />
        <View style={styles.contentGrid}>
          <View style={styles.leftColumn}>
            <Stats
              totalBeds={totalBeds}
              occupiedBeds={occupiedBeds}
              availableBeds={availableBeds}
            />
            <Occupancy totalBeds={totalBeds} occupiedBeds={occupiedBeds} />
          </View>
          <View style={styles.rightColumn}>
            <Chart totalBeds={totalBeds} occupiedBeds={occupiedBeds} />
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      accessible={true}
      accessibilityLabel={`Hospital details for ${
        hospitalData?.hospital_name || 'Unknown'
      }`}
      accessibilityHint="Shows detailed information about the selected hospital">
      <View style={styles.contentWrapper}>{renderContent()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: isWeb ? maxContentWidth : '100%',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(16),
  },
  contentGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: moderateScale(16),
    marginTop: verticalScale(16),
  },
  leftColumn: {
    flex: isWeb ? 1 : undefined,
    gap: moderateScale(16),
  },
  rightColumn: {
    flex: isWeb ? 1 : undefined,
  },
  errorText: {
    fontSize: moderateScale(16),
    color: 'red',
    textAlign: 'center',
    padding: moderateScale(16),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(16),
    minHeight: isWeb ? 400 : undefined,
  },
  noDataText: {
    fontSize: moderateScale(16),
    color: 'gray',
    textAlign: 'center',
  },
});

export default React.memo(HospitalDetails);
