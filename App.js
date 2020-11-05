import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font' //Export font
import {AppLoading} from 'expo'

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'


const fetchFonts = () => {
  return Font.loadAsync({
    'octin-sport' : require('./assets/fonts/Octin-Sports-Heavy.ttf')
  })
}

export default function App() {
  const [userNumber, setuserNumber] = useState()
  const [guessRounds, setguessRounds] = useState(0)
  const [dataLoaded, setdataLoaded] = useState(false)

  if(!dataLoaded){
    return <AppLoading startAsync={fetchFonts}
                       onFinish={() => setdataLoaded(true)}
                      onError={() => console.log('error')}/> //On attend que les font loads pour continuer
  }


  const startGameHandler = (selectedNumber) => {
    setuserNumber(selectedNumber)
  }

  const newGame = () => {
    setuserNumber();
    setguessRounds(0)
  }

  const gameOverHandler = (nbOfRounds)=>{
    setguessRounds(nbOfRounds)
  }
  let content = <StartGameScreen handleStart={startGameHandler} />

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }else if(guessRounds > 0){
    content = <GameOverScreen guessedNumber={userNumber} rounds={guessRounds} onNewGame={newGame} />
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number'></Header>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
