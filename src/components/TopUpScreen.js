import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TopUpCart from './TopUpCart';

const TopUpsScreen = ({ topUps, deleteTopUp }) => {
  const [selectedTopUp, setSelectedTopUp] = useState(null);

  const handleLongPress = (category, index) => {
    setSelectedTopUp({ category, index });
  };

  const handleDelete = () => {
    if (selectedTopUp) {
      deleteTopUp(selectedTopUp.category, selectedTopUp.index);
      setSelectedTopUp(null);
    }
  };


  return (
    <View style={styles.container}>
      <TopUpCart 
        topUps={topUps} 
        selectedTopUp={selectedTopUp} 
        handleLongPress={handleLongPress} 
        handleDelete={handleDelete} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#383F51', 
    padding: 10, 
    borderRadius: 8, 
  },
});

export default TopUpsScreen;