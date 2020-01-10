import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { welcomeScreenImages } from '../constants/images'

const WelcomeLogo = () => {
    return (
        <View style={StyleSheet.container}>
            <Text style={styles.text}>Welcome to the:</Text>
            <Image source={welcomeScreenImages.logo} style={styles.image}></Image>
        </View>
    )
}

export default WelcomeLogo
const styles = StyleSheet.create({
    container:{
        flex: 1,

    },
    text: {
        color: "#fff",
        textAlign: 'center',
        fontSize: 18, 
        marginTop: 40
    },
    image:{
        width: 240,
        height:240,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom:25
    }

});