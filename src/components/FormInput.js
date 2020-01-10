import React, {Component} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as theme from "../constants/theme";

export default class FormInput extends Component {
  constructor(props) {
    super(props);


  }
 
  render() {
    const {
      iconName,
      iconColor,
      returnKeyType,
      keyboardType,
      name,
      inputStyle,
      placeholder,
      placeholderColor,
      inputContainerStyle,
     
      ...rest
    } = this.props;
    return (
      <View style={styles.inputContainer}>
        <Input
          {...rest}
          leftIcon={<Ionicons name={iconName} size={24} color={iconColor} />}
          leftIconContainerStyle={styles.iconStyle}
          inputStyle={styles.input}
          placeholderTextColor={placeholderColor}
          name={name}
          placeholder={placeholder}
          style={styles.input}
          autoCapitalize="none"
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          inputContainerStyle={inputContainerStyle}
          
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    marginRight: 10
  },
  input: {
    color: theme.colors.primaryPink
  },
  inputContainer: {
    backgroundColor: "rgb( 255,255,255)",
    borderRadius: 20
  }
});
