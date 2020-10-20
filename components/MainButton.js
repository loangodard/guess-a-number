import React from 'react'
import {View,Text,StyleSheet,Button,TouchableOpacity} from 'react-native'

import Color from '../constants/color'

const MainButton = props => {
    return(
    <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.textButton}>{props.children}</Text>
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:Color.primary,
        padding:10,
        borderRadius:15
    },
    textButton:{
        color:'white',
        fontWeight:"bold"
    }
})

export default MainButton