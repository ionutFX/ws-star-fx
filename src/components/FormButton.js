import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import * as theme from '../constants/theme'


const FormButton = ({ title, buttonType, buttonColor, iconName, iconColor, ...rest }) => (
    <Button 
        { ...rest }
        type = { buttonType }
        title = { title }
        icon={<Ionicons  name={iconName} color={iconColor} size={ 20}  iconStyle={{borderRadius:50}} />}
        buttonStyle={{ borderWidth: 1.5, borderColor: buttonColor, borderRadius: 20, width:'92%', alignSelf:"center", paddingVertical: 3}}
        titleStyle={{ color: buttonColor, marginLeft:10 }}
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
            colors:[theme.colors.buttonBlue, theme.colors.buttonPurple],
            start: {x:0, y:0} ,
            end:{x:1, y:0}
        }}
        />
    
)

export default FormButton
