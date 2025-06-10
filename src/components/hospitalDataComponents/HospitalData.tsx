import React, {useEffect, useCallback} from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setPage, addItems} from '../../store/paginationSlice';
import {useGetHospitalDataQuery} from '../../api/hospitalApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DateFormatter from '../../helpers/DateFormatter';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

// Stack navigation type definitions
type RootStackParamList = {
  HospitalList: undefined;
  HospitalDetails: {hospitalData: any};
  FlaggedHospitals: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'HospitalList'>;

const HospitalData = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {currentPage, itemsPerPage, allItems} = useAppSelector(
    state => state.pagination,
  );

  // Fetch hospital data using the current pagination values
  const {data, isLoading, isFetching, error} = useGetHospitalDataQuery({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  // Whenever new data comes in, append it to our existing list
  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(addItems(data));
    }
  }, [data, dispatch]);

  // This handles loading more items when the user scrolls to the bottom
  const handleLoadMore = useCallback(() => {
    if (!isFetching) {
      dispatch(setPage(currentPage + 1));
    }
  }, [dispatch, currentPage, isFetching]);

  // Render each hospital item in the list
  const renderHospitalItem = useCallback(
    ({item}: {item: any}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('HospitalDetails', {hospitalData: item})
        }
        accessible={true}
        accessibilityLabel={`Hospital ${item.hospital_name} in ${item.hospital_state}`}
        accessibilityHint="Double tap to view detailed information about this hospital">
        <Text style={styles.itemTitle}>{item.hospital_name}</Text>
        <Text style={styles.itemDetail}>{item.hospital_state}</Text>
        <Text style={styles.itemDetail}>
          Last Updated: {DateFormatter(item.collection_week)}
        </Text>
      </TouchableOpacity>
    ),
    [navigation],
  );

  // Show loading spinner on initial load
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.loadingText}>Loading hospital data...</Text>
      </View>
    );
  }

  // Handle any error that might have occurred during data fetching
  if (error) {
    const errorMsg =
      error instanceof Error ? error.message : 'An error occurred';
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText} accessibilityLabel="Error loading data">
          Error loading data: {errorMsg}
        </Text>
      </View>
    );
  }

  // Main list view with hospitals
  return (
    <View
      accessible={true}
      accessibilityLabel="Hospital List"
      style={styles.container}>
      <FlatList
        data={allItems}
        renderItem={renderHospitalItem}
        keyExtractor={(item, index) => `${item.hospital_pk}-${index}`} // More unique than just index, flashy
        onEndReached={handleLoadMore} // Trigger pagination
        onEndReachedThreshold={0.5} // Trigger a bit before hitting the end
        accessibilityLabel="List of hospitals"
        accessibilityHint="Scroll through the list of hospitals"
        ListEmptyComponent={
          <Text style={styles.noDataText}>No hospital data available.</Text>
        }
        ListFooterComponent={
          isFetching ? (
            <View style={styles.loadingFooter}>
              <ActivityIndicator size="small" color="blue" />
              <Text style={styles.loadingText}>Loading more...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

// Styling - using scale utils for responsive UI, specifically for mobile
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: moderateScale(16),
    marginBottom: verticalScale(16),
    backgroundColor: 'lightgray',
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: 'gray',
    margin: moderateScale(10),
  },
  itemTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    color: 'black',
  },
  itemDetail: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(4),
    color: 'black',
  },
  noDataText: {
    fontSize: moderateScale(14),
    color: 'gray',
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(14),
    color: 'gray',
  },
  loadingFooter: {
    padding: moderateScale(16),
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: moderateScale(16),
    color: 'red',
    textAlign: 'center',
  },
});

// Wrapping in React.memo to avoid unnecessary re-renders
export default React.memo(HospitalData);
