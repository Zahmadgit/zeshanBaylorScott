import React, {useEffect, useRef, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setPage, addItems} from '../../store/paginationSlice';
import {useGetHospitalDataQuery} from '../../api/hospitalApi';
import DateFormatter from '../../helpers/DateFormatter';

interface Hospital {
  hospital_name: string;
  hospital_state: string;
  collection_week: string;
}

interface Props {
  navigation: any;
}

const HospitalData = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {currentPage, itemsPerPage, allItems} = useAppSelector(
    state => state.pagination,
  );

  const {data, isLoading, isFetching, error} = useGetHospitalDataQuery({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.length) {
      dispatch(addItems(data));
    }
  }, [data, dispatch]);

  const handleLoadMore = useCallback(() => {
    if (!isFetching) {
      dispatch(setPage(currentPage + 1));
    }
  }, [currentPage, isFetching, dispatch]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const {scrollTop, scrollHeight, clientHeight} = element;
      const threshold = 0.1;
      const isNearBottom =
        scrollTop + clientHeight >= scrollHeight * (1 - threshold);

      if (isNearBottom && !isFetching) {
        handleLoadMore();
      }
    };

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore, isFetching]);

  const renderHospitalItem = useCallback(
    (item: Hospital) => (
      <div
        style={styles.itemContainer}
        onClick={() =>
          navigation.navigate('HospitalDetails', {hospitalData: item})
        }>
        <div style={styles.itemTitle}>{item.hospital_name}</div>
        <div style={styles.itemDetail}>{item.hospital_state}</div>
        <div style={styles.itemDetail}>
          Last Updated: {DateFormatter(item.collection_week)}
        </div>
      </div>
    ),
    [navigation],
  );

  return (
    <div ref={scrollRef} style={styles.container}>
      {isLoading ? (
        <div style={styles.loading}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div style={styles.error}>
          <div>Error loading data: {error?.message || 'An error occurred'}</div>
        </div>
      ) : (
        <div style={styles.list}>
          {allItems.map((item: Hospital, index: number) => (
            <div key={index} style={styles.itemWrapper}>
              {renderHospitalItem(item)}
            </div>
          ))}
          {isFetching && (
            <div style={styles.loading}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    overflowY: 'auto',
    padding: '16px',
    boxSizing: 'border-box',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    color: '#dc3545',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  itemWrapper: {
    width: '100%',
  },
  itemContainer: {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  itemTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#212529',
  },
  itemDetail: {
    fontSize: '14px',
    marginBottom: '4px',
    color: '#495057',
  },
};

export default HospitalData;
