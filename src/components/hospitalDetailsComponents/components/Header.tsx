import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from '../../../store/hooks';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

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

const Header = ({hospitalData, toggleFlag, isFlagged}: Props) => {
  const {flaggedHospitals} = useAppSelector(state => state.flaggedHospitals);

  // Check if this hospital is flagged in local state
  const isFlaggedLocal = flaggedHospitals.some(
    (h: any) => h.id === hospitalData.hospital_pk,
  );

  return (
    <View
      style={styles.header}
      accessible={true}
      accessibilityLabel={`Hospital header for ${hospitalData.hospital_name}`}
      accessibilityHint="Shows hospital name and location">
      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Text
            style={styles.hospitalName}
            accessibilityLabel={`Hospital name: ${hospitalData.hospital_name}`}
            numberOfLines={2}
            adjustsFontSizeToFit>
            {hospitalData.hospital_name}
          </Text>
          <Text
            style={styles.hospitalLocation}
            accessibilityLabel={`Location: ${hospitalData.hospital_state}`}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {hospitalData.hospital_state}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.flagButton, isFlaggedLocal && styles.flagButtonActive]}
          onPress={() => {
            toggleFlag();
          }}
          accessible={true}
          accessibilityLabel={
            isFlagged ? 'Currently flagged hospital' : 'Flag this hospital'
          }
          accessibilityHint="Double tap to toggle flag status"
          accessibilityState={{selected: isFlagged}}>
          <Text
            style={[
              styles.flagButtonText,
              isFlagged && styles.flagButtonTextActive,
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {isFlagged ? 'Currently Flagged' : 'Flag'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the header layout and components
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    borderBottomWidth: scale(1),
    borderBottomColor: 'lightgray',
  },
  headerContent: {
    padding: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: scale(16),
  },
  hospitalName: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
    flexWrap: 'wrap',
  },
  hospitalLocation: {
    fontSize: moderateScale(16),
    color: 'gray',
  },
  flagButton: {
    padding: moderateScale(12),
    borderRadius: scale(8),
    backgroundColor: 'lightgray',
    minWidth: scale(100),
    alignItems: 'center',
  },
  flagButtonActive: {
    backgroundColor: 'green',
  },
  flagButtonText: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    color: 'black',
  },
  flagButtonTextActive: {
    color: 'white',
  },
});

export default React.memo(Header);
