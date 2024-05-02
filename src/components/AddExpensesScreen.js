import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Platform, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

// Import SuccessMessage component
import SuccessMessage from './SuccessMessage'; 


const AddExpensesScreen = ({ addExpense }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for showing success message

  const handleEnter = () => {
    const expense = {
      date: selectedDate,
      category: selectedCategory,
      amount: expenseAmount,
      description: expenseDescription,
    };
    addExpense(expense);
    // Set state to show success message
    setShowSuccessMessage(true);
    // Reset form fields
    setSelectedDate(new Date());
    setSelectedCategory('');
    setExpenseAmount('');
    setExpenseDescription('');
    // Disable button after adding expense
    setDisableButton(true);
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios' && event.type === 'press' ? !showDatePicker : false);
    setSelectedDate(currentDate);
    checkButtonStatus(currentDate, selectedCategory, expenseAmount);
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
    checkButtonStatus(selectedDate, category, expenseAmount);
  };

  const onAmountChange = (amount) => {
    setExpenseAmount(amount);
    checkButtonStatus(selectedDate, selectedCategory, amount);
  };

  const onDescriptionChange = (description) => {
    setExpenseDescription(description); // Update the state with the correct parameter
    checkButtonStatus(selectedDate, selectedCategory, expenseAmount);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#383F51' }]}>
  <Text style={styles.title}>Add Expense</Text>
  <View style={styles.inputContainer}>
    <View style={styles.inputRow}>
      <Ionicons name="calendar" size={24} color="#DDDBF1" style={styles.icon} />
      <Button
         title='select date'
         onPress={() => setShowDatePicker(true)}
         color={'#383F51'}>
      </Button>
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
      placeholder="Enter Expense Amount"
      placeholderTextColor="#AB9F9D"
      keyboardType="numeric"
      value={expenseAmount}
      onChangeText={onAmountChange}
    />
    <TextInput
      style={styles.input}
      placeholder="Enter Expense Description"
      placeholderTextColor="#AB9F9D"
      keyboardType="default"
      value={expenseDescription}
      onChangeText={onDescriptionChange}
    />
    <Picker
      selectedValue={selectedCategory}
      style={[styles.input, styles.picker]}
      dropdownIconColor="#AB9F9D"
      onValueChange={onCategoryChange}
      mode="dropdown"
      itemStyle={{ height: 30 }}
    >
      <Picker.Item label="Select Category" value="" />
      <Picker.Item label="Food" value="Food" />
      <Picker.Item label="Pharmacy" value="Pharmacy" />
      <Picker.Item label="Clothes" value="Clothes" />
      <Picker.Item label="Gifts" value="Gifts" />
      <Picker.Item label="Rent" value="Rent" />
      <Picker.Item label="Repairs" value="Repairs" />
      <Picker.Item label="Transportation" value="Transportation" />
      <Picker.Item label="Child Care" value="Child Care" />
      <Picker.Item label="Health Care" value="Health Care" />
      <Picker.Item label="Other" value="Other" />
    </Picker>
  </View>
  <TouchableOpacity style={styles.addButton} onPress={handleEnter} disabled={disableButton}>
    <Text style={styles.buttonText}>Add Expense</Text>
  </TouchableOpacity>
  {/* Show the success message popup if showSuccessMessage is true */}
  <SuccessMessage visible={showSuccessMessage} message="Expense Successfully Added!" />
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
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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

export default AddExpensesScreen;
