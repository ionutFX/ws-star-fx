import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, Share } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default class ShareApp extends Component {

    share = async () =>{
       
        try {
            const result = await Share.share({
                message: "Check this app",
                url: "https://google.com"
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                  console.warn(result.activityType);
                } else {
                  // shared
                  console.warn('shared')
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.warn('dismissed')
              }
        } catch (error) {
            Alert.alert(error.message)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Ionicons name="md-share" size={25} color="#fff" onPress={this.share}/>
                <Text style={{color:"#FFF"}}>Share</Text>
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
