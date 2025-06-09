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
import DateFormatter from '../../helpers/DateFormatter';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

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
    return (
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
    );
  };

  return (
    <View accessible={true} accessibilityLabel="Hospital List">
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText} accessibilityLabel="Error loading data">
          Error loading data:{' '}
          {error instanceof Error ? error.message : 'An error occurred'}
        </Text>
      ) : (
        <FlatList
          data={allItems}
          renderItem={({item}) => renderHospitalItem(item)}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          accessibilityLabel="List of hospitals"
          accessibilityHint="Scroll through the list of hospitals"
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
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(16),
  },
  itemContainer: {
    padding: moderateScale(16),
    marginBottom: verticalScale(16),
    backgroundColor: '#f8f9fa',
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: '#e9ecef',
  },
  itemTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    color: '#212529',
  },
  itemDetail: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(4),
    color: '#495057',
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(8),
    marginVertical: verticalScale(4),
  },
  legendColor: {
    width: scale(12),
    height: scale(12),
    marginRight: scale(4),
    borderRadius: scale(2),
  },
  legendText: {
    fontSize: moderateScale(12),
    color: '#495057',
  },
  noDataText: {
    fontSize: moderateScale(14),
    color: '#6c757d',
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
    color: '#6c757d',
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
    color: '#dc3545',
    textAlign: 'center',
  },
});

export default HospitalData;
