import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

type Props = {
  totalBeds: number;
  occupiedBeds: number;
};

const Occupancy = ({totalBeds, occupiedBeds}: Props) => {
  const occupancyRate = ((occupiedBeds / totalBeds) * 100).toFixed(1);

  return (
    <View
      style={styles.occupancyContainer}
      accessible={true}
      accessibilityLabel={`Current occupancy rate: ${occupancyRate}%`}
      accessibilityHint="Shows the percentage of beds currently occupied">
      <Text style={styles.occupancyText}>Occupancy Rate: {occupancyRate}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  occupancyContainer: {
    padding: moderateScale(16),
    borderTopWidth: scale(1),
    borderTopColor: '#ddd',
  },
  occupancyText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
});

export default Occupancy;
