import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default class Contact extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Ionicons name="ios-mail" size={25} color="#fff"/>
                <Text style={{color:"#FFF"}}>Contact</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingVertical:20,
        
        alignItems:'center'
    }
})
