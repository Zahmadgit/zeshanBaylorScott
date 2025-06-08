import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeFlaggedHospital } from '../../store/flaggedHospitalsSlice';

interface FlaggedHospital {
  id: string;
  hospital_name: string;
  hospital_state: string;
  collection_week: string;
}

const FlaggedHospitals = () => {
  const dispatch = useAppDispatch();
  const { flaggedHospitals } = useAppSelector((state) => state.flaggedHospitals);

  const renderHospitalItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => dispatch(removeFlaggedHospital(item.id))}
    >
      <Text style={styles.itemTitle}>{item.hospital_name}</Text>
      <Text style={styles.itemDetail}>{item.hospital_state}</Text>
      <Text style={styles.itemDetail}>
        Last Updated: {item.collection_week}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flagged Hospitals</Text>
      {flaggedHospitals.length === 0 ? (
        <Text>No hospitals flagged yet</Text>
      ) : (
        <FlatList
          data={flaggedHospitals}
          renderItem={renderHospitalItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

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
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 16,
    color: '#666',
  },
});

export default FlaggedHospitals;
