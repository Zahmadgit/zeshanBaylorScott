import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Pie, PolarChart} from 'victory-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  HospitalList: undefined;
  HospitalDetails: {hospitalData: any};
};

type Props = NativeStackScreenProps<RootStackParamList, 'HospitalDetails'>;

const HospitalDetails = ({route}: Props) => {
  const {hospitalData} = route.params;

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
          <Text style={styles.noDataText}>No chart data available</Text>
        </View>
      </View>
    );
  }

  const availableBeds = totalBeds - occupiedBeds;
  const safeAvailableBeds = Math.max(0, availableBeds);
  const safeOccupiedBeds = Math.min(occupiedBeds, totalBeds);

  const chartData = [
    {
      value: safeOccupiedBeds,
      color: '#FF6384',
      label: `Occupied: ${safeOccupiedBeds.toFixed(1)}`
    },
    {
      value: safeAvailableBeds,
      color: '#36A2EB',
      label: `Available: ${safeAvailableBeds.toFixed(1)}`
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hospitalName}>{hospitalData.hospital_name}</Text>
        <Text style={styles.hospitalLocation}>
          {hospitalData.hospital_state}
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <View style={{height: 200, width: 300, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{height: 300}}>
            <PolarChart
              data={chartData}
              labelKey="label"
              valueKey="value"
              colorKey="color"
            >
              <Pie.Chart
                innerRadius={50}
                size={200}
              />
            </PolarChart>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  hospitalLocation: {
    fontSize: 16,
    color: '#666',
  },
  chartContainer: {
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
});

export default HospitalDetails;
