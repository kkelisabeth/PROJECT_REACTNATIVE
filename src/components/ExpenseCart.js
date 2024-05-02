import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const categoryIconMapping = {
  Food: require('../icons/restaurant.png'),
  Pharmacy: require('../icons/pharmacy.png'),
  Clothes: require('../icons/cothes.png'),
  Gifts: require('../icons/gift-box.png'),
  Rent: require('../icons/key.png'),
  Repairs: require('../icons/tools.png'),
  Transportation: require('../icons/transportation.png'),
  'Child Care': require('../icons/maternity.png'),
  'Health Care': require('../icons/healthcare.png'),
  Other: require('../icons/application.png'),
};

const ExpenseCart = ({ expenses, selectedExpense, handleLongPress, handleDelete }) => {
  
  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollView}>
      {expenses.map((expense, index) => (
        <TouchableOpacity 
          key={index} 
          onLongPress={() => handleLongPress(expense.category, index)} 
          style={[
            styles.expenseItem,
            index === expenses.length - 1 && { marginBottom: 0 }
          ]}
        >
          <View style={styles.expenseInfo}>
            <Image 
              source={categoryIconMapping[expense.category]} 
              style={styles.icon} 
            />
            <View>
              <Text style={styles.expenseAmount}>${expense.amount}</Text>
              <Text style={styles.expenseDescription}>{expense.description}</Text>
              <Text style={styles.expenseCategory}>{expense.category}</Text>
            </View>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateDay}>{new Date(expense.date).getDate()}</Text>
            <Text style={styles.dateMonth}>{new Date(expense.date).toLocaleString('default', { month: 'short' })}</Text>
          </View>
          {selectedExpense && selectedExpense.category === expense.category && selectedExpense.index === index && (
            <TouchableOpacity onPress={() => handleDelete(expense.category, index)}>
            <Image source={require('../icons/trash.png')} style={styles.deleteIcon} />
          </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#383F51', 
    width:395, 
    height:1000,
    marginLeft:-10,
    marginTop:-10,
    marginBottom:-10
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'#383F51',
    marginTop:30
  },

  //Expense Item Container Style
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20, 
    backgroundColor: '#383F51',
    borderRadius: 20,
    width: 378,
    marginLeft: -3,
    marginTop:5,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 100,
  },

  //Expense Information Styles
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  expenseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseAmount: {
    fontSize: 14,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-Bold',
  },
  expenseDescription: {
    fontSize: 10,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-SemiBold',
  },
  expenseCategory:{
    fontSize: 12,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-SemiBold',
  },

  //Date Styles
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#383F51',
    width:50,
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 100,
  },
  dateDay: {
    fontSize: 18,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-Bold',
  },
  dateMonth: {
    fontSize: 14,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-Bold',
  },

  //Delete Icon Style
  deleteIcon: {
    marginLeft:10,
    width: 24,
    height: 24,
  },
});

export default ExpenseCart;
