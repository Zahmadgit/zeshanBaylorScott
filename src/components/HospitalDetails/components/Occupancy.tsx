import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  totalBeds: number;
  occupiedBeds: number;
};

const Occupancy = ({totalBeds, occupiedBeds}: Props) => {
  const occupancyRate = ((occupiedBeds / totalBeds) * 100).toFixed(1);

  return (
    <View style={styles.occupancyContainer}>
      <Text style={styles.occupancyText}>
        Occupancy Rate: {occupancyRate}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  occupancyContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  occupancyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Occupancy;
