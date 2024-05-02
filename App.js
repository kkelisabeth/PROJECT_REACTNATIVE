/**
 *  Finance Tracker
 *  Description: This is a simple Finance Tracker app, that includes only the necessary features: 
 *                    -> addition & deletion of expenses & topups 
 *                    -> clear view of statistics of all the transactions
 *                    -> future possibility of expanding 
 *                    -> API connection 
 *
 *  Created by: Dmitrii Frolov, ELizabeth Paula Kozlova, Marios Nicolaou
 *
 */


import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

//Import Screens
import StatsScreen from './src/components/StatsScreen';
import AddExpensesScreen from './src/components/AddExpensesScreen';
import ExpensesScreen from './src/components/ExpensesScreen';
import TopUpsScreen from './src/components/TopUpScreen';
import AddTopUpsScreen from './src/components/AddTopUpsScreen';
import AccountSettingsScreen from './src/components/AccountSettingsScreen';
import ApiTestScreen from './src/components/ApiTestScreen'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

//Import Custom Font
const [fontsLoaded] = useFonts({
  'MavenPro-Black': require('./assets/fonts/MavenPro-Black.ttf'),
  'MavenPro-Bold': require('./assets/fonts/MavenPro-Bold.ttf'),
  'MavenPro-ExtraBold': require('./assets/fonts/MavenPro-ExtraBold.ttf'),
  'MavenPro-Medium': require('./assets/fonts/MavenPro-Medium.ttf'),
  'MavenPro-Regular': require('./assets/fonts/MavenPro-Regular.ttf'),
  'MavenPro-SemiBold': require('./assets/fonts/MavenPro-SemiBold.ttf'),
});

  const [expenses, setExpenses] = useState([]);
  const [topUps, setTopUps] = useState([]);

  useEffect(() => {
    loadExpenses();
    loadTopUps();
  }, []);

  useEffect(() => {
    saveExpenses();
    saveTopUps();
  }, [expenses, topUps]);

  //Save and Load Expenses & TopUps
  const loadExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses !== null) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const saveExpenses = async () => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  const loadTopUps = async () => {
    try {
      const storedTopUps = await AsyncStorage.getItem('topUps');
      if (storedTopUps !== null) {
        setTopUps(JSON.parse(storedTopUps));
      }
    } catch (error) {
      console.error('Error loading top-ups:', error);
    }
  };

  const saveTopUps = async () => {
    try {
      await AsyncStorage.setItem('topUps', JSON.stringify(topUps));
    } catch (error) {
      console.error('Error saving top-ups:', error);
    }
  };

  //Add and Delete Expenses & TopUps
  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (category, index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);    
    setExpenses(updatedExpenses);
  };

  const addTopUp = (topUp) => {
    setTopUps([topUp, ...topUps]);
  };

  const deleteTopUp = (category, index) => {
    const updatedTopUps = [...topUps];
    updatedTopUps.splice(index, 1);    
    setTopUps(updatedTopUps);
  };
  
  const getTotal = () => {
    let total = 0;
    expenses.forEach((expense) => {
      total += parseFloat(expense.amount);
    });
    return total.toFixed(2);
  };

  //Bottom Tab Navigation
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Expenses') {
              iconName = 'pricetag-outline';
            } else if (route.name === 'Add Expenses') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'TopUps') {
              iconName = 'card-outline';
            } else if (route.name === 'Add TopUp') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'Stats') {
              iconName = 'stats-chart-sharp';
            } else if (route.name === 'Settings') {
              iconName = 'settings-outline';
            }else if (route.name === 'Quote') {
              iconName = 'link-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#383F51',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: '#F9F9F9',
            borderTopWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          },
        }}
      >
      <Tab.Screen name="Quote" component={ApiTestScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Expenses" options={{ headerShown: false }}>
          {() => <ExpensesScreen expenses={expenses} deleteExpense={deleteExpense} />}
        </Tab.Screen>
        <Tab.Screen name="Add Expenses" options={{ headerShown: false }}>
          {() => <AddExpensesScreen addExpense={addExpense} />}
        </Tab.Screen>
        <Tab.Screen name="Stats" options={{ headerShown: false }}>
          {() => <StatsScreen topUps={topUps} expenses={expenses} />}
        </Tab.Screen>
        <Tab.Screen name="Add TopUp" options={{ headerShown: false }}>
          {() => <AddTopUpsScreen addTopUp={addTopUp} />}
        </Tab.Screen>
        <Tab.Screen name="TopUps" options={{ headerShown: false }}>
          {() => <TopUpsScreen topUps={topUps} deleteTopUp={deleteTopUp} />}
        </Tab.Screen>
        <Tab.Screen name="Settings" options={{ headerShown: false }}>
          {({ navigation }) => <AccountSettingsScreen navigation={navigation} />}
        </Tab.Screen>
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;