import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;

type Props = {
  totalBeds: number;
  occupiedBeds: number;
};

const Chart = ({totalBeds, occupiedBeds}: Props) => {
  const availableBeds = totalBeds - occupiedBeds;
  //avoid rounding to nearest decimal chart legend data, pie chart wont display
  const safeAvailableBeds = Math.max(0, availableBeds);
  const safeOccupiedBeds = Math.min(occupiedBeds, totalBeds);

  const pieData = [
    {
      name: 'Occupied',
      population: safeOccupiedBeds,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: moderateScale(15),
    },
    {
      name: 'Available',
      population: safeAvailableBeds,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: moderateScale(15),
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#ffffff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: scale(2),
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View
      style={styles.chartContainer}
      accessible={true}
      accessibilityLabel="Bed occupancy chart"
      accessibilityHint="Shows the distribution of occupied and available beds">
      <Text style={styles.chartTitle} accessibilityLabel="Bed Occupancy Chart">
        Bed Occupancy
      </Text>
      <PieChart
        data={pieData}
        width={screenWidth - scale(32)}
        height={verticalScale(200)}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    padding: moderateScale(16),
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
  },
});

export default Chart;
