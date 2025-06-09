import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {addFlaggedHospital, removeFlaggedHospital} from '../../../store/flaggedHospitalsSlice';

type Props = {
  hospitalData: {
    hospital_pk: number;
    hospital_name: string;
    hospital_state: string;
    collection_week: string;
  };
  navigation: NativeStackNavigationProp<any, any>;
  toggleFlag: () => void;
  isFlagged: boolean;
};

const Header = ({hospitalData, navigation, toggleFlag, isFlagged}: Props) => {
  const dispatch = useAppDispatch();
  const {flaggedHospitals} = useAppSelector((state) => state.flaggedHospitals);

  const isFlaggedLocal = flaggedHospitals.some(
    (h: any) => h.id === hospitalData.hospital_pk
  );

  return (
    <View style={styles.header}>
      <Text style={styles.hospitalName}>{hospitalData.hospital_name}</Text>
      <Text style={styles.hospitalLocation}>{hospitalData.hospital_state}</Text>
      <TouchableOpacity
        style={[styles.flagButton, isFlaggedLocal && styles.flagButtonActive]}
        onPress={() => {
          toggleFlag();
          
        }}
      >
        <Text style={[styles.flagButtonText, isFlagged && styles.flagButtonTextActive]}>
          {isFlagged ? 'Currently Flagged' : 'Flag'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  hospitalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  hospitalLocation: {
    fontSize: 16,
    color: '#666',
  },
  flagButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  flagButtonActive: {
    backgroundColor: '#4CAF50',
  },
  flagButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  flagButtonTextActive: {
    color: '#fff',
  },
});

export default Header;
