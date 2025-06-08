import React, {useEffect} from 'react';
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

type RootStackParamList = {
  HospitalList: undefined;
  HospitalDetails: {hospitalData: any};
  FlaggedHospitals: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'HospitalList'>;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const HospitalData = ({navigation}: Props) => {
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

  const renderHospitalItem = (item: any) => {
    const lastUpdated = new Date(item.collection_date).toLocaleDateString();
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('HospitalDetails', {hospitalData: item})
        }>
        <Text style={styles.itemTitle}>{item.hospital_name}</Text>
        <Text style={styles.itemDetail}>{item.hospital_state}</Text>
        <Text style={styles.itemDetail}>
          Last Updated: {formatDate(item.collection_date)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error loading data: {error.message}</Text>
      ) : (
        <FlatList
          data={allItems}
          renderItem={({item}) => renderHospitalItem(item)}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetching ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212529',
  },
  itemDetail: {
    fontSize: 14,
    marginBottom: 4,
    color: '#495057',
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    marginRight: 4,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: '#495057',
  },
  noDataText: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6c757d',
  },
  loadingFooter: {
    padding: 16,
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
});

export default HospitalData;
