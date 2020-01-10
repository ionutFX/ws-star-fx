import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as StoreReview from 'expo-store-review';

export default class RateUs extends Component {


    handleAppReview = () => {
        StoreReview.requestReview();
    }
    render() {
        return (
            <View style={styles.container}>
                <Ionicons name="md-star" size={25} color="#fff" onPress={this.handleAppReview}/>
                <Text style={{color:"#FFF"}} >Rate Us</Text>
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