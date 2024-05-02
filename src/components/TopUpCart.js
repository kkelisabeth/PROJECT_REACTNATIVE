// TopUpCart.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const categoryIconMapping = {
  Salary: require('../icons/income.png'),
  Bonus: require('../icons/bonus.png'),
  Gift: require('../icons/gift-box.png'),
  Other: require('../icons/application.png'),
};

const TopUpCart = ({ topUps, selectedTopUp, handleLongPress, handleDelete }) => {
  return (
   <View style={styles.container}>
   <ScrollView contentContainerStyle={styles.scrollView}>
      {topUps.map((topUp, index) => (
        <TouchableOpacity 
          key={index} 
          onLongPress={() => handleLongPress(topUp.category, index)} 
          style={[
            styles.topUpItem,
            index === topUps.length - 1 && { marginBottom: 0 }
          ]}
        >
          <View style={styles.topUpInfo}>
            <Image 
              source={categoryIconMapping[topUp.category]} 
              style={styles.icon} 
            />
            <View>
              <Text style={styles.topUp}>${topUp.amount}</Text>
              <Text style={styles.topUpCategory}>{topUp.category}</Text>
            </View>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateDay}>{new Date(topUp.timestamp).getDate()}</Text>
            <Text style={styles.dateMonth}>{new Date(topUp.timestamp).toLocaleString('default', { month: 'short' })}</Text>
          </View>
          {selectedTopUp && selectedTopUp.category === topUp.category && selectedTopUp.index === index && (
            <TouchableOpacity onPress={() => handleDelete(topUp.category, index)}>
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

  //TopUp Item Container Style
  topUpItem: {
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

  //TopUp Information Styles
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  topUpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#DDDBF1',
  },
  topUp: {
    fontSize: 14,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-Bold',
  },
  topUpCategory:{
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
    marginLeft: 10,
    width: 24,
    height: 24,
  },
});

export default TopUpCart;
