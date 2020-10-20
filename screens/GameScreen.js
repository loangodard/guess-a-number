import React, { useState,useRef, useEffect } from 'react'
import { View, Text, StyleSheet,Button,Alert} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'
import Card from '../components/Card'

const generateRandomBetween = (min,max,exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rdNumber = Math.floor(Math.random()*(max-min))+min;
    if(rdNumber === exclude){
        return generateRandomBetween(min,max,exclude)
    }
    return rdNumber
}

const GameScreen = props => {
    const [currentGuess, setcurrentGuess] = useState(generateRandomBetween(1,100,props.userChoice))
    const [rounds, setrounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const {userChoice, onGameOver} = props

    useEffect(()=>{
        if(currentGuess == userChoice){
            onGameOver(rounds)
        }
    },[currentGuess,userChoice,onGameOver])

    const nextGuessHandler = direction => {
        if((direction === 'lower' && props.userChoice > currentGuess) || (direction === 'greater' && props.userChoice < currentGuess)){
            Alert.alert("Don't Lie !","You know it is wrong...",[{text: 'Sorry', style: 'cancel'}])
            return
        }
        if(direction == "lower"){
            currentHigh.current = currentGuess
        }else{
            currentLow.current = currentGuess
        }
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess)
        setcurrentGuess(nextNumber)
        setrounds(curRounds => curRounds+1)
    }

    return(
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={()=>nextGuessHandler('lower')}>
                    <Ionicons size={24} name={"md-remove"} />
                </MainButton>
                <MainButton onPress={()=>nextGuessHandler('greater')}>
                    <Ionicons size={24} name={"md-add"} />
                </MainButton>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'
    }
})

export default GameScreen