import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
};

const Stats = ({totalBeds, occupiedBeds, availableBeds}: Props) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{totalBeds.toFixed(0)}</Text>
        <Text style={styles.statLabel}>Total Beds</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, {color: '#FF6384'}]}>
          {occupiedBeds.toFixed(0)}
        </Text>
        <Text style={styles.statLabel}>Occupied</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, {color: '#36A2EB'}]}>
          {availableBeds.toFixed(0)}
        </Text>
        <Text style={styles.statLabel}>Available</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});

export default Stats;
