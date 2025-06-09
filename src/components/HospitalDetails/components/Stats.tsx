import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

const isWeb = Platform.OS === 'web';

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
        <Text style={[styles.statNumber, {color: 'red'}]}>
          {occupiedBeds.toFixed(0)}
        </Text>
        <Text style={styles.statLabel}>Occupied</Text>
      </View>
      <View
        style={styles.statItem}
        accessible={true}
        accessibilityLabel={`Available beds: ${availableBeds.toFixed(0)}`}>
        <Text style={[styles.statNumber, {color: 'blue'}]}>
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
    backgroundColor: 'white',
    borderRadius: scale(8),
    ...(isWeb && {
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }),
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: moderateScale(8),
  },
  statNumber: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  statLabel: {
    fontSize: moderateScale(16),
    color: 'gray',
    textAlign: 'center',
  },
});

export default React.memo(Stats);
