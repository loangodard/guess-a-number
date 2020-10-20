import React, { useState,useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Image} from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <Text>The Game Is Over</Text>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/lfc.png')}/>
                </View>
                <Text>You guess the number in {props.rounds} rounds</Text>
                <NumberContainer>{props.guessedNumber}</NumberContainer>
                <Button title={'Start a new Game'} onPress={props.onNewGame}/>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
    },
    card:{
        marginTop:19,
        padding:50,
        width:'80%'
    },
    imageContainer:{
        width:150,
        height:150,
        borderRadius:300,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:30
    },
    image:{
        width:'100%',
        height:'100%'
    }
})

export default GameOverScreen