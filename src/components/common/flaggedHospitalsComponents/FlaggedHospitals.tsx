import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {removeFlaggedHospital} from '../../../store/flaggedHospitalsSlice';
import DateFormatter from '../../../helpers/DateFormatter';
import platformAlert from '../../../helpers/platformAlert';

const FlaggedHospitals = () => {
  const dispatch = useAppDispatch();
  const {flaggedHospitals} = useAppSelector(state => state.flaggedHospitals);

  const handleUnflagHospital = (hospital: any) => {
    platformAlert(
      'Unflag Hospital',
      `Are you sure you want to remove ${hospital.hospital_name} from your flagged hospitals?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'Unflag',
          style: 'destructive',
          onPress: () => dispatch(removeFlaggedHospital(hospital.id)),
        },
      ],
      {cancelable: true},
    );
  };

  // Renders each flagged hospital as a card with a delete button
  const renderHospitalItem = ({item}: {item: any}) => (
    <View style={styles.itemContainer}>
      <View style={styles.hospitalInfo}>
        <Text style={styles.itemTitle}>{item.hospital_name}</Text>
        <Text style={styles.itemDetail}>{item.hospital_state}</Text>
        <Text style={styles.itemDetail}>
          Last Updated: {DateFormatter(item.collection_week)}
        </Text>
        <Text style={styles.itemDetail}>Location: {item.address}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleUnflagHospital(item)}
        accessible={true}
        accessibilityLabel="Unflag hospital"
        accessibilityHint="Double tap to remove this hospital from flagged list">
        <Text style={styles.deleteButtonText}>Unflag</Text>
      </TouchableOpacity>
    </View>
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
      <Button
        title="Close"
        onPress={() => {
          window.alert('bruh');
        }}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hospitalInfo: {
    flex: 1,
    marginRight: 16,
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
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default React.memo(FlaggedHospitals);
