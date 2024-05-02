import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, PanResponder } from 'react-native';

const ApiTestScreen = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [quote, setQuote] = useState('');
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingQuote, setLoadingQuote] = useState(true);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Reset image and quote loading states
        setLoadingImage(true);
        setLoadingQuote(true);
      },
      onPanResponderRelease: () => {
        // Fetch new image and quote from the APIs
        fetchImage();
        fetchQuote();
      },
    })
  ).current;

  const fetchImage = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.message);
        setLoadingImage(false);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
        setLoadingImage(false);
      });
  };

  const fetchQuote = () => {
    fetch('https://api.api-ninjas.com/v1/quotes?category=money', {
      headers: {
        'X-Api-Key': '1duwkUr5du3GKRA87pEJJQ==fyUTYylDMG4btzWc'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0 && data[0].quote) {
          setQuote(data[0].quote);
        } else {
          console.error('Invalid quote data:', data);
        }
        setLoadingQuote(false);
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
        setLoadingQuote(false);
      });
  };
  

  useEffect(() => {
    fetchImage();
    fetchQuote();
  }, []);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {loadingQuote ? (
        <ActivityIndicator size="small" color="#00A6FF" />
      ) : (
        <Text style={styles.quote}>{quote}</Text>
      )}
      {loadingImage ? (
        <ActivityIndicator size="large" color="#00A6FF" />
      ) : (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      )}
      <Text style={styles.sidenote}>Press the Screen to see the magic</Text>
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

  //Quote Style
  quote: {
    fontSize: 16,
    marginBottom: 20,
    color: '#DDDBF1',
    textAlign: 'center',
    fontFamily: 'MavenPro-SemiBold',
  },

  //Image Style
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  //Bottom Side Note Style
  sidenote:{
    backgroundColor: '#DDDBF1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#383F51',
    fontFamily: 'MavenPro-Bold',
  }
});

export default ApiTestScreen;
