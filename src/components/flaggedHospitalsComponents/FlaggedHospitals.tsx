import React from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {removeFlaggedHospital} from '../../store/flaggedHospitalsSlice';
import DateFormatter from '../../helpers/DateFormatter';

const FlaggedHospitals = () => {
  const dispatch = useAppDispatch();
  const {flaggedHospitals} = useAppSelector(state => state.flaggedHospitals);

  // Renders each flagged hospital as a touchable card
  const renderHospitalItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      // Tapping a hospital removes it from the flagged list
      onPress={() => dispatch(removeFlaggedHospital(item.id))}>
      <Text style={styles.itemTitle}>{item.hospital_name}</Text>
      <Text style={styles.itemDetail}>{item.hospital_state}</Text>
      <Text style={styles.itemDetail}>
        Last Updated: {DateFormatter(item.collection_week)}
      </Text>
      <Text style={styles.itemDetail}>Location: {item.address}</Text>
    </TouchableOpacity>
  );
  // Show a message if nothing is flagged yet
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flagged Hospitals</Text>
      {flaggedHospitals.length === 0 ? (
        <Text>No hospitals flagged yet</Text>
      ) : (
        // Otherwise, show the list of flagged hospitals
        <FlatList
          data={flaggedHospitals}
          renderItem={renderHospitalItem}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};

// Styling for layout and cards
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 16,
    color: 'gray',
  },
});

export default React.memo(FlaggedHospitals);
