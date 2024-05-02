import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, FlatList, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-svg-charts';

const StatsScreen = ({ topUps = [], expenses = [], navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalTopUps, setTotalTopUps] = useState(0);
  const [percentageExpensesByCategory, setPercentageExpensesByCategory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Filter recent transactions based on selected category and date range
    const filtered = [...expenses, ...topUps].filter((transaction) => {
      const isInRange =
        !selectedDateRange.startDate ||
        !selectedDateRange.endDate ||
        (transaction.date >= selectedDateRange.startDate && transaction.date <= selectedDateRange.endDate);
      return isInRange;
    });
    setFilteredTransactions(filtered);

    // Calculate total expenses
    const expensesTotal = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    setTotalExpenses(expensesTotal);

    // Calculate total top-ups
    const topUpsTotal = topUps.reduce((acc, topUp) => acc + parseFloat(topUp.amount), 0);
    setTotalTopUps(topUpsTotal);

    // Calculate percentage expenses by category
    const categories = [...new Set(expenses.map(expense => expense.category))];
    const percentageExpenses = categories.map(category => {
      const categoryTotal = expenses.reduce((acc, expense) => (expense.category === category ? acc + parseFloat(expense.amount) : acc), 0);
      return { category, percentage: (categoryTotal / expensesTotal) * 100 };
    });
    setPercentageExpensesByCategory(percentageExpenses);
  }, [selectedDateRange, topUps, expenses]);

  // Calculate available balance
  const availableBalance = totalTopUps - totalExpenses;

  // Get unique categories from expenses and top-ups
  const uniqueExpenseCategories = [...new Set(expenses.map(expense => expense.category))];
  const uniqueTopUpCategories = [...new Set(topUps.map(topUp => topUp.category))];

  // Function to filter transactions by category
  const filterTransactionsByCategory = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(false);
  };

  // Function to filter transactions by date range
  const filterDataByDateRange = () => {
    const filtered = [...expenses, ...topUps].filter((transaction) => {
      const isInRange =
        !selectedDateRange.startDate ||
        !selectedDateRange.endDate ||
        (transaction.date >= selectedDateRange.startDate && transaction.date <= selectedDateRange.endDate);
      return isInRange;
    });
    setFilteredTransactions(filtered);
    setIsModalVisible(false);
  };

  // Function to reset filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedDateRange({ startDate: null, endDate: null });
    setFilteredTransactions([...expenses, ...topUps]);
    setIsModalVisible(false);
  };

  // Calculate total amount for selected category
  const totalAmountForSelectedCategory = selectedCategory === 'expenses'
    ? expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
    : selectedCategory === 'topUps'
    ? topUps.reduce((acc, topUp) => acc + parseFloat(topUp.amount), 0)
    : filteredTransactions
        .filter(transaction => transaction.category === selectedCategory)
        .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  // Summary statistics
  const averageExpensePerCategory = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0) / uniqueExpenseCategories.length;

  // Colors for the pie chart
  const colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', '#ffb3e6', '#c2f0c2', '#ff6666', '#c2c2d6', '#b3e6ff'];

  return (
    <View style={styles.container}>
      <View style={styles.headerRight}>
        <Ionicons name="filter" size={24} color="black" onPress={() => setIsModalVisible(true)} />
      </View>
      <View style={styles.balanceContainer}>
      <Text style={[styles.balanceAmount, availableBalance >= 0 ? styles.positiveBalance : styles.negativeBalance]}>
  ${availableBalance.toFixed(2)}
</Text>

{selectedCategory && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total in Category: ${totalAmountForSelectedCategory.toFixed(2)}</Text>
          </View>
        )}
      </View>
      <View style={styles.dataContainer}>
        {/* Visualization - Pie Chart */}
        {!selectedCategory && (
          <>
            <Text style={styles.visualizationTitle}>Expense Categories Breakdown</Text>
            <PieChart
              style={styles.pieChart}
              data={percentageExpensesByCategory.map((item, index) => ({ value: item.percentage, svg: { fill: colors[index] }, key: `pie-${index}` }))}
            />
            {/* Legend */}
            <View style={styles.legendContainer}>
              {percentageExpensesByCategory.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendIcon, { backgroundColor: colors[index] }]} />
                  <Text style={styles.legendText}>{item.category}</Text>
                </View>
              ))}
            </View>
          </>
        )}

{!selectedCategory && (
  <>
    <Text style={styles.visualizationTitle}>Recent Transactions</Text>
    <FlatList
      data={filteredTransactions}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Text style={styles.legendText}>{item.category }: {item.category === 'topUps' || ['Salary', 'Bonus', 'Gift', 'Other'].includes(item.category) ? '+' : '-'}${Math.abs(item.amount)}</Text>
      )}
    />
  </>
)}
{selectedCategory !== '' &&  selectedCategory !== 'expenses' &&  selectedCategory !== 'topUps' && (
  <>
    <Text style={styles.visualizationTitle}>Transactions</Text>
    <FlatList
      data={filteredTransactions.filter(transaction => transaction.category === selectedCategory)}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Text style={styles.filterText}>{item.category}: {item.category === 'topUps' || ['Salary', 'Bonus', 'Gift', 'Other'].includes(item.category) ? '+' : '-'}${Math.abs(item.amount)}</Text>
      )}
    />
  </>
)}
{selectedCategory === 'expenses'  && (
  <>
    <Text style={styles.visualizationTitle}>Recent Expenses</Text>
    <FlatList
      data={filteredTransactions.filter(transaction => !['Salary', 'Bonus', 'Gift', 'Other'].includes(transaction.category))}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Text style={styles.filterText}>{item.category}: -${Math.abs(item.amount)}</Text>
      )}
    />
  </>
)}
{selectedCategory === 'topUps' && (
  <>
    <Text style={styles.visualizationTitle}>Recent Top-Ups</Text>
    <FlatList
      data={filteredTransactions.filter(transaction => ['Salary', 'Bonus', 'Gift', 'Other'].includes(transaction.category))}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Text style={styles.filterText}>{item.category}: +${Math.abs(item.amount)}</Text>
      )}
    />
  </>
)}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
  <View style={styles.modalContent}>
    <Text style={styles.modalHeader}>Filter Options</Text>
    <ScrollView>
      <Text style={styles.filterText}>Expenses:</Text>
      <TouchableOpacity style={styles.button} onPress={() => filterTransactionsByCategory('expenses')}>
        <Text style={styles.buttonText}>All Expenses</Text>
      </TouchableOpacity>
      {uniqueExpenseCategories.map(category => (
        <View key={category}>
          <TouchableOpacity style={styles.button} onPress={() => filterTransactionsByCategory(category)}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text style={styles.filterText}>Top-Ups:</Text>
      <TouchableOpacity style={styles.button} onPress={() => filterTransactionsByCategory('topUps')}>
        <Text style={styles.buttonText}>All Top-Ups</Text>
      </TouchableOpacity>
      {uniqueTopUpCategories.map(category => (
        <View key={category}>
          <TouchableOpacity style={styles.button} onPress={() => filterTransactionsByCategory(category)}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text style={styles.filterText}>Filter by Date Range:</Text>
      {/* Add date range filter components here */}
      <TextInput
        style={styles.input}
        placeholder="Start Date"
        placeholderTextColor={'#AB9F9D'}
        onChangeText={(text) => {
          // Handle input for start date
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date"
        placeholderTextColor={'#AB9F9D'}
        onChangeText={(text) => {
          // Handle input for end date
        }}
      />
      <TouchableOpacity style={styles.button} onPress={filterDataByDateRange}>
        <Text style={styles.buttonText}>Apply</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={resetFilters}>
        <Text style={styles.secondaryButtonText}>Reset</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
</View>


        
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383f51', // Dark blue
    paddingTop:30

  },

  //Title/Balance Style
  balanceContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  positiveBalance: {
    fontSize: 70,
    color: '#2ecc71',// Green
    fontFamily: 'MavenPro-Bold', 
  },
  negativeBalance: {
    fontSize: 70,
    color: '#e74c3c', // Red
    fontFamily: 'MavenPro-Bold',
  },
  
  //Open Filter Options Button Style
  headerRight: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1, 
    marginTop:190
  },

  //Sub-Container Styles
  dataContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#3c4f76', // Light blue
    borderTopLeftRadius: 30, // Rounded corners at the top
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor:'#383F51',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 50,
  },

  //Sub-title Style
  visualizationTitle: {
    fontSize: 24,
    marginBottom: 15,
    color: '#dddbf1', // Light purple
    fontFamily: 'MavenPro-ExtraBold',
    marginTop:20,
    marginBottom:10,
  },

  //Pie Chart Styles
  pieChart: {
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },

  //Styles of Components below the pie chart
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  legendIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
    borderRadius: 50,
  },
  legendText: {
    fontSize: 16,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-Regular',
   },
  
  //Filter Options Styles
  //Filter Options Container Style
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#383F51',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 100, // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#383f51', // Dark blue
    padding: 20,
    borderRadius: 20,
    width: '80%',
    maxHeight: '80%',
    elevation: 5, // Add elevation for shadow on Android
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    color: '#DDDBF1',
    fontFamily: 'MavenPro-Bold',
  },

  //Title Style
  modalHeader: {
    fontSize: 24,
    marginBottom: 15,
    color: '#dddbf1', // Light purple
    fontFamily: 'MavenPro-ExtraBold',
  },

  //Sub Titles Styles (Expenses & TopUps)
  filterText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-SemiBold',
  },

  //User Input Styles
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ab9f9d', // Light gray
    borderRadius: 10,
    padding: 7,
    width: '100%',
    color: '#DDDBF1',
    fontFamily: 'MavenPro-Regular',  
  },

  //Buttons Styles
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor:'#383F51',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 100,
  },
  button: {
    flex: 1,
    backgroundColor: '#383F51', // Red
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonText: {
    fontSize: 12,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-SemiBold',   
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#e74c3c', // Red
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  secondaryButtonText: {
    fontSize: 12,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-SemiBold',  
  },

  //Total in Category Title Styles
  totalContainer: {
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    color: '#DDDBF1', // Light purple
    fontFamily: 'MavenPro-Bold',
  },
});


export default StatsScreen;
