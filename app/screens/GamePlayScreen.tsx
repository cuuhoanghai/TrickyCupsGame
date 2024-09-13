import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Animated, StyleSheet,Dimensions  } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function GameScreen() {
  const [selectedCup, setSelectedCup] = useState<number | null> (null);
  const [ballPosition, setBallPosition] = useState <number | null>(null);
  const [gameResult, setGameResult] = useState <string | null> (null); 
  const [shuffling, setShuffling] = useState(true);

  const cup1Animation = useRef(new Animated.Value(0)).current;
  const cup2Animation = useRef(new Animated.Value(0)).current;
  const cup3Animation = useRef(new Animated.Value(0)).current;

  const scaleAnimation = useRef(new Animated.Value(1)).current;
  useEffect(()=>{
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
  },[scaleAnimation]);
  useEffect(() => {
    const randomPosition = Math.floor(Math.random() * 3);
    setBallPosition(randomPosition);

   
    shuffleCups();
  }, []);

  const resetAnimationValues = () => {
    // Reset lại giá trị của cốc về vị trí ban đầu trước khi hoán đổi
    cup1Animation.setValue(0);
    cup2Animation.setValue(0);
    cup3Animation.setValue(0);
  };

  const shuffleCups = () => {
    setShuffling(true); // Đặt trạng thái đang hoán đổi cốc

    resetAnimationValues(); 

    
    Animated.sequence([
      Animated.timing(cup1Animation, {
        toValue: 100, 
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cup2Animation, {
        toValue: -100, 
        duration: 500,
        useNativeDriver: true,
      }),
    
      Animated.timing(cup1Animation, {
        toValue: 0, 
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cup2Animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cup2Animation, {
        toValue: 100, 
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cup3Animation, {
        toValue: -100, 
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cup2Animation, {
        toValue: 0, 
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cup3Animation, {
        toValue: 0, 
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setShuffling(false)); // Khi hoàn thành hoán đổi cốc, đặt lại trạng thái của cốc
  };

  const handleCupSelection = (cupIndex: number) => {
    if (!shuffling) {
      setSelectedCup(cupIndex);
      if (cupIndex === ballPosition) {
        setGameResult('win');
      } else {
        setGameResult('lose');
      }
    }
  };

  const handleRestart = () => {
    setSelectedCup(null); 
    setGameResult(null); 
    const randomPosition = Math.floor(Math.random() * 3); 
    setBallPosition(randomPosition);
    shuffleCups(); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/background.png')} style={styles.backgroundImage} />

      <View style={styles.cupsContainer}>
        {/* Cốc 1 */}
        <Animated.View style={{ transform: [{ translateX: cup1Animation }] }}>
          <TouchableOpacity onPress={() => handleCupSelection(0)} style={styles.cup}>
            <Image source={require('../../assets/plastic-cup.png')} style={styles.cupImage} />
            {selectedCup === 0 && ballPosition === 0 && (
              <Image source={require('../../assets/ball.png')} style={styles.ball} />
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Cốc 2 */}
        <Animated.View style={{ transform: [{ translateX: cup2Animation }] }}>
          <TouchableOpacity onPress={() => handleCupSelection(1)} style={styles.cup}>
            <Image source={require('../../assets/plastic-cup.png')} style={styles.cupImage} />
            {selectedCup === 1 && ballPosition === 1 && (
              <Image source={require('../../assets/ball.png')} style={styles.ball} />
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Cốc 3 */}
        <Animated.View style={{ transform: [{ translateX: cup3Animation }] }}>
          <TouchableOpacity onPress={() => handleCupSelection(2)} style={styles.cup}>
            <Image source={require('../../assets/plastic-cup.png')} style={styles.cupImage} />
            {selectedCup === 2 && ballPosition === 2 && (
              <Image source={require('../../assets/ball.png')} style={styles.ball} />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Kết quả  */}
      {gameResult && (
        <View style={styles.resultContainer}>
          <Image
            source={
              gameResult === 'win'
                ? require('../../assets/you-win.png')
                : require('../../assets/you-lose.png')
            }
            style={styles.resultImage}
          />
          <TouchableOpacity onPress={handleRestart}>
            <Animated.Image 
            source={require('../../assets/tap-to-restart.png')} 
            style={[styles.tapToRestart,{transform: [{scale: scaleAnimation}] }]} 
             resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
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
  cupsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  cup: {
    alignItems: 'center',
  },
  cupImage: {
    width: 100,
    height: 100,
  },
  ball: {
    position: 'absolute',
    width: 30,
    height: 30,
    bottom: -15,
  },
  resultContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  resultImage: {
    width: 150,
    height: 50,
  },
  tapToRestart: {
    width: screenWidth * 0.6, 
    height: screenWidth * 0.15,
    marginTop: 20,
  },
});
