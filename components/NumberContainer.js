import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Color from '../constants/color'

const NumberContainer = props => {
    return(
    <View style={styles.container}>
        <Text style={styles.number}>{props.children}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderWidth:4,
        borderColor: Color.accent,
        padding:10,
        borderRadius:10,
        marginVertical:10,
        justifyContent:'center',
        alignContent:'center'
    },
    number:{
        fontSize:30,
        fontWeight:'bold',
        color:Color.accent,
        fontFamily:'octin-sport'
    }
})

export default NumberContainer