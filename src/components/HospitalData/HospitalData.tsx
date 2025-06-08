import React, {useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setPage, addItems} from '../../store/paginationSlice';
import {useGetHospitalDataQuery} from '../../api/hospitalApi';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const HospitalData = () => {
  const dispatch = useAppDispatch();
  const {currentPage, itemsPerPage, allItems} = useAppSelector(
    state => state.pagination,
  );
  const {data, isLoading, isFetching, error} = useGetHospitalDataQuery({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(addItems(data));
    }
  }, [data, dispatch]);

  const handleLoadMore = () => {
    if (!isFetching) {
      dispatch(setPage(currentPage + 1));
    }
  };

  if (error) {
    return <Text>Error loading data</Text>;
  }

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={allItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.hospital_name}</Text>
            <Text>State: {item.state}</Text>
            <Text>Collection Date: {formatDate(item.collection_week)}</Text>

            <Text>
              Total Beds: {item.all_adult_hospital_inpatient_beds_7_day_avg}
            </Text>
            <Text>
              Occupied Beds:{' '}
              {item.all_adult_hospital_inpatient_bed_occupied_7_day_avg}
            </Text>
          </View>
        )}
        onEndReached={handleLoadMore}
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="small" color="#0000ff" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  chart: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default HospitalData;
