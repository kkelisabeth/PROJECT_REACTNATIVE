import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const AccountSettingsScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#AB9F9D"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#AB9F9D"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Quote')}
      >
        <Text style={styles.buttonText}>Go to Quote Page</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#383F51',
  },

  //Title Style
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#DDDBF1',
    fontFamily: 'MavenPro-ExtraBold', // Apply custom font here
  },

  //Placeholder Style
  input: {
    borderWidth: 1,
    borderColor: '#AB9F9D',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    fontFamily: 'MavenPro-Regular', // Apply custom font here
  },

  //Go to Quote Page Button Style
  button: {
    backgroundColor: '#DDDBF1',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#383F51',
    fontFamily: 'MavenPro-Bold', // Apply custom font here
    fontSize:12,
  },
});


export default AccountSettingsScreen;
