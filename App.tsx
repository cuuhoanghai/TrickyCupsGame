import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, Text,Animated,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import GameScreen from './app/screens/GamePlayScreen';

const screenWidth = Dimensions.get('window').width;

// HomeScreen

export default function App() {
  const [gameStart, setGameStart] = useState(false);
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  useEffect(()=>{
    Animated.timing(fadeAnimation,{
      toValue:1,
      duration:3000,
      useNativeDriver:true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  },[fadeAnimation,scaleAnimation]);


  const handleStartGame = () =>{
    setGameStart(true);
  };

  if(!gameStart){
    return(
      <View style = {styles.container}>
        <Image source={require('./assets/home-background.png')} style={styles.backgroundImage}/>
        <Animated.View style={{opacity:fadeAnimation}}>
          <Image source={require('./assets/logo.png')} style={styles.logo}/>
        </Animated.View>
        <TouchableOpacity onPress={handleStartGame}>
          <Animated.Image 
            source={require('./assets/tap-to-play.png')} 
            resizeMode="contain"
            style={[styles.tapToPlay,{transform: [{scale: scaleAnimation}] }]} 
          />

        </TouchableOpacity>
      </View>
    )
  }
  else{
    return <GameScreen />
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 220,
    height: 100,
    marginBottom: 100,
  },
  tapToPlay: {
    width: screenWidth * 0.6, 
    height: screenWidth * 0.15,
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
// <NavigationContainer>
    //   <Stack.Navigator initialRouteName=''>
    //     <Stack.Screen name="" component={} />
    //     <Stack.Screen name="" component={} />

    //   </Stack.Navigator>
    // </NavigationContainer>