import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity  } from 'react-native';

const SuccessMessage = ({ visible, message }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.successMessage}>{message}</Text>
          <TouchableOpacity onPress={() => {}} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },

  //Success Message Container Style
  modalView: {
    backgroundColor: '#DDDBF1',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#383F51',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  //Success Message Style
  successMessage:{
    textAlign: 'center',
    color: '#383F51',
    fontFamily: 'MavenPro-Regular',
  },

  //Close Button Style
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#383F51', // Button background color
    borderRadius: 5,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#DDDBF1',
    fontFamily: 'MavenPro-Bold',
  },
});

export default SuccessMessage;
 