import React from 'react';
import {View, Text, Dimensions, StyleSheet, Platform} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

// Get screen width and determine if platform is web
const {width: screenWidth} = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

type Props = {
  totalBeds: number;
  occupiedBeds: number;
};

const Chart = ({totalBeds, occupiedBeds}: Props) => {
  // Calculate available beds while making sure values are safe (no negatives)
  const availableBeds = totalBeds - occupiedBeds;
  const safeAvailableBeds = Math.max(0, availableBeds);
  const safeOccupiedBeds = Math.min(occupiedBeds, totalBeds);

  // Data passed to the PieChart dont round to nearest decimal, chart legend data, pie chart wont display
  const pieData = [
    {
      name: 'Occupied',
      population: safeOccupiedBeds,
      color: 'red',
      legendFontColor: 'gray',
      legendFontSize: moderateScale(15),
    },
    {
      name: 'Available',
      population: safeAvailableBeds,
      color: 'blue',
      legendFontColor: 'gray',
      legendFontSize: moderateScale(15),
    },
  ];

  // Chart styling and behavior
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: scale(2),
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  // Handle responsive width and height, limit max width on web
  const chartWidth = isWeb 
    ? Math.min(screenWidth - scale(64), 500)
    : screenWidth - scale(32);

  const chartHeight = isWeb ? 300 : 200;

  return (
    <View 
      style={styles.chartContainer}
      accessible={true}
      accessibilityLabel="Bed occupancy chart"
      accessibilityHint="Shows the distribution of occupied and available beds">
      <Text 
        style={styles.chartTitle}
        accessibilityLabel="Bed Occupancy Chart">
        Bed Occupancy
      </Text>

      <View style={styles.chartWrapper}>
        <PieChart
          data={pieData}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft={isWeb ? "0" : "15"}
          absolute // Shows exact numbers instead of percentages
        />
      </View>
    </View>
  );
};

// Styles for the chart container and layout
const styles = StyleSheet.create({
  chartContainer: {
    padding: moderateScale(16),
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: scale(8),
    ...(isWeb && {
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // subtle shadow only for web
    }),
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  chartTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
  },
});

export default React.memo(Chart);
