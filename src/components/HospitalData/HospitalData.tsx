import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

const HospitalData = () => {
  const [bedData, setBedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://healthdata.gov/resource/anag-cw7u.json?$limit=30&$offset=1',
        );
        const json = await response.json();
        setBedData(json);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
  return (
    <View>
      <Text>HospitalData</Text>
      <FlatList
        data={bedData}
        keyExtractor={(_, index) => index.toString()} //since elements cannot be guaranteed to be unique, we'll use the index instead
        renderItem={({item}) => {
          return <Text>{item.state}</Text>;
        }}
      />
    </View>
  );
};

export default HospitalData;
