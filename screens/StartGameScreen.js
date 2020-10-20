import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'

import Card from '../components/Card'
import Input from '../components/Input'
import Colors from '../constants/color'
import NumberContainer from "../components/NumberContainer"
import MainButton from '../components/MainButton'

const StartGameScreen = props => {

    const [enteredValue, setenteredValue] = useState('')
    const [confirmed, setconfirmed] = useState(false)
    const [selectedNumber, setselectedNumber] = useState()

    const numberInputHandler = (inputText) => {
        setenteredValue(inputText.replace(/[^0-9]/g, ''))//on remplace les char non nombres par ''
    }

    const resetInputHandler = () => {
        setconfirmed(false)
        setenteredValue('')
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Invalid Number','Number has to be a number in 1;99',[{text:'Ok',style:'cancel',onPress: resetInputHandler}])
            return
        }
        setconfirmed(true)
        setselectedNumber(chosenNumber)
        setenteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = <Card style={styles.selectedNumberCard}>
            <Text>You selected :</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.handleStart(selectedNumber)}>START GAME</MainButton>
        </Card>
    }

    return (
        // Quand on appuie sur l'écran, le clavier est désactivé
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start A New Game</Text>
                <Card style={
                    {
                        padding: 20,
                        width: 300,
                        maxWidth: '80%',
                        marginVertical:10
                    }
                }>
                    <Text>Select a Number</Text>
                    <Input style={styles.input} keyboardType="numeric" maxLength={2} onChangeText={numberInputHandler} value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title='Reset' onPress={resetInputHandler} color={Colors.accent} /></View>
                        <View style={styles.button}><Button title='Confirm' onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    title: {
        fontSize: 30,
        marginVertical: 10,
        fontFamily:'octin-sport'
    },
    inputContainer: {
        padding: 20,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    selectedNumberCard :{
        padding:30,
        alignItems:"center"
    }
})

export default StartGameScreen