import React, {useEffect, useRef, useCallback} from 'react';
import styled from 'styled-components';
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
      <ItemContainer
        onClick={() =>
          navigation.navigate('HospitalDetails', {hospitalData: item})
        }>
        <ItemTitle>{item.hospital_name}</ItemTitle>
        <ItemDetail>{item.hospital_state}</ItemDetail>
        <ItemDetail>
          Last Updated: {DateFormatter(item.collection_week)}
        </ItemDetail>
      </ItemContainer>
    ),
    [navigation],
  );

  return (
    <Container ref={scrollRef}>
      {isLoading ? (
        <Loading>
          <div>
            <span>Loading...</span>
          </div>
        </Loading>
      ) : error ? (
        <ErrorBox>
          <div>Error loading data: {error?.message || 'An error occurred'}</div>
        </ErrorBox>
      ) : (
        <List>
          {allItems.map((item: Hospital, index: number) => (
            <ItemWrapper key={index}>{renderHospitalItem(item)}</ItemWrapper>
          ))}
          {isFetching && (
            <Loading>
              <div>
                <span>Loading...</span>
              </div>
            </Loading>
          )}
        </List>
      )}
    </Container>
  );
};

export default HospitalData;

const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding: 16px;
  box-sizing: border-box;
  background-color: #f1f3f5;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #dc3545;
  background-color: #ffe3e3;
  border-radius: 8px;
  font-weight: 500;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ItemWrapper = styled.div`
  width: 100%;
`;

const ItemContainer = styled.div`
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #e9ecef;
    transform: scale(1.01);
  }
`;

const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #212529;
`;

const ItemDetail = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  color: #495057;
`;
