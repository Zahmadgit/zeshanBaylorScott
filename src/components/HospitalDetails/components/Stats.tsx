import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

type Props = {
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
};

const Stats = ({totalBeds, occupiedBeds, availableBeds}: Props) => {
  return (
    <View
      style={styles.statsContainer}
      accessible={true}
      accessibilityLabel="Hospital bed statistics"
      accessibilityHint="Shows total, occupied, and available beds">
      <View
        style={styles.statItem}
        accessible={true}
        accessibilityLabel={`Total beds: ${totalBeds.toFixed(0)}`}>
        <Text style={styles.statNumber}>{totalBeds.toFixed(0)}</Text>
        <Text style={styles.statLabel}>Total Beds</Text>
      </View>
      <View
        style={styles.statItem}
        accessible={true}
        accessibilityLabel={`Occupied beds: ${occupiedBeds.toFixed(0)}`}>
        <Text style={[styles.statNumber, {color: '#FF6384'}]}>
          {occupiedBeds.toFixed(0)}
        </Text>
        <Text style={styles.statLabel}>Occupied</Text>
      </View>
      <View
        style={styles.statItem}
        accessible={true}
        accessibilityLabel={`Available beds: ${availableBeds.toFixed(0)}`}>
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
    padding: moderateScale(16),
    borderBottomWidth: scale(1),
    borderBottomColor: '#ddd',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: moderateScale(16),
    color: '#666',
    marginTop: verticalScale(4),
  },
});

export default Stats;
