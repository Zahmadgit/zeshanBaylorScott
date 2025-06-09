import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

const isWeb = Platform.OS === 'web';

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
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    borderRadius: scale(8),
    alignItems: 'center',
    ...(isWeb && {
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }),
  },
  occupancyText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: 'black',
  },
});

export default React.memo(Occupancy);
