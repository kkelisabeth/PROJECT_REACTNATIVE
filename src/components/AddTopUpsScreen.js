import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import SuccessMessage from './SuccessMessage'; // Import SuccessMessage component

const AddTopUpsScreen = ({ addTopUp }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [topUpAmount, setTopUpAmount] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const handleEnter = () => {
    const topUp = {
      timestamp: selectedDate,
      category: selectedCategory,
      amount: topUpAmount,
    };
    addTopUp(topUp);
    setShowSuccessMessage(true); // Show success message
    setTimeout(() => {
      setShowSuccessMessage(false); // Hide success message after 3 seconds
    }, 3000);
    setSelectedDate(new Date());
    setSelectedCategory('');
    setTopUpAmount('');
    setDisableButton(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
    checkButtonStatus(currentDate, selectedCategory, topUpAmount);
  };

  const checkButtonStatus = (date, category, amount) => {
    if (date && category && amount && !isNaN(parseFloat(amount))) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const onCategoryChange = (category) => {
    setSelectedCategory(category);
    checkButtonStatus(selectedDate, category, topUpAmount);
  };

  const onAmountChange = (amount) => {
    setTopUpAmount(amount);
    checkButtonStatus(selectedDate, selectedCategory, amount);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#383F51' }]}>
      <Text style={styles.title}>Add Top-Up</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Ionicons name="calendar" size={24} color="#DDDBF1" style={styles.icon} />
          <Button
             title='Select Date'
             onPress={() => setShowDatePicker(true)}
             color={'#383F51'}
             style={styles.selectDateButton}
          ></Button>
          {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Top-Up Amount"
          placeholderTextColor="#AB9F9D"
          keyboardType="numeric"
          value={topUpAmount}
          onChangeText={onAmountChange}
        />
        <Picker
          selectedValue={selectedCategory}
          style={[styles.input, styles.picker]}
          dropdownIconColor="#AB9F9D"
          onValueChange={onCategoryChange}
          mode="dropdown"
        >
          <Picker.Item label="Select Category"  value="" />
          <Picker.Item label="Salary" value="Salary" />
          <Picker.Item label="Bonus" value="Bonus" />
          <Picker.Item label="Gift" value="Gift" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleEnter} disabled={disableButton}>
        <Text style={styles.buttonText}>Add Top-Up</Text>
        
      </TouchableOpacity>
      <SuccessMessage visible={showSuccessMessage} message="Top-Up Successfully Added!" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop:30
  },
  
  //Title Style
  title: {
    fontSize: 24,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-ExtraBold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },

  //Select Date Button Style
  inputContainer: {
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },

  //User Input Style
  input: {
    borderWidth: 1,
    borderColor: '#AB9F9D',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 300,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-Regular',
  },

  //Select Category Picker Style
  picker: {
    marginTop: 10,
    width: 180,
  },

  //Add Button Style
  addButton: {
    backgroundColor: '#DDDBF1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 12,
    color: '#383F51',
    fontFamily: 'MavenPro-Bold',
  },
});

export default AddTopUpsScreen;
