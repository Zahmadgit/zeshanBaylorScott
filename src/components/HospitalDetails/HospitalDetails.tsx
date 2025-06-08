import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {addFlaggedHospital, removeFlaggedHospital} from '../../store/flaggedHospitalsSlice';

type RootStackParamList = {
  HospitalList: undefined;
  HospitalDetails: {hospitalData: any};
  FlaggedHospitals: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'HospitalDetails'>;

const screenWidth = Dimensions.get('window').width;

const HospitalDetails = ({route, navigation}: Props) => {
  const {hospitalData} = route.params;
  const dispatch = useAppDispatch();
  const {flaggedHospitals} = useAppSelector((state) => state.flaggedHospitals);

  const isFlagged = flaggedHospitals.some(
    (h) => h.id === hospitalData.hospital_pk
  );

  const toggleFlag = () => {
    if (isFlagged) {
      // Remove from flagged if it exists
      dispatch(removeFlaggedHospital(hospitalData.hospital_pk));
    } else {
      // Add to flagged
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
        <View style={styles.header}>
          <Text style={styles.hospitalName}>{hospitalData.hospital_name}</Text>
          <Text style={styles.hospitalLocation}>
            {hospitalData.hospital_state}
          </Text>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.noDataText}>
            No chart data available
            {'\n'}Total: {totalBeds}, Occupied: {occupiedBeds}
          </Text>
        </View>
      </View>
    );
  }

  const availableBeds = totalBeds - occupiedBeds;
  const safeAvailableBeds = Math.max(0, availableBeds);
  const safeOccupiedBeds = Math.min(occupiedBeds, totalBeds);

  // Chart Kit data structure
  const pieData = [
    {
      name: 'Occupied',
      population: safeOccupiedBeds,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Available',
      population: safeAvailableBeds,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hospitalName}>{hospitalData.hospital_name}</Text>
        <Text style={styles.hospitalLocation}>
          {hospitalData.hospital_state}
        </Text>
        <TouchableOpacity
          style={[
            styles.flagButton,
            isFlagged && styles.flagButtonActive,
          ]}
          onPress={() => {
            toggleFlag();
            if (isFlagged) {
              navigation.navigate('FlaggedHospitals');
            }
          }}
        >
          <Text style={[styles.flagButtonText, isFlagged && styles.flagButtonTextActive]}>
            {isFlagged ? '✓ Flagged' : 'Flag'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display summary stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalBeds.toFixed(0)}</Text>
          <Text style={styles.statLabel}>Total Beds</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, {color: '#FF6384'}]}>
            {safeOccupiedBeds.toFixed(0)}
          </Text>
          <Text style={styles.statLabel}>Occupied</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, {color: '#36A2EB'}]}>
            {safeAvailableBeds.toFixed(0)}
          </Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Bed Occupancy</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 50]}
          absolute
        />
      </View>

      {/* Occupancy rate */}
      <View style={styles.occupancyContainer}>
        <Text style={styles.occupancyText}>
          Occupancy Rate: {((safeOccupiedBeds / totalBeds) * 100).toFixed(1)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flagButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
  },
  flagButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  flagButtonText: {
    color: '#333',
    fontSize: 14,
  },
  flagButtonTextActive: {
    color: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  hospitalLocation: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  occupancyContainer: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  occupancyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
});

export default HospitalDetails;
