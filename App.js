import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Navigation from './src/screens';




export default function App() {
  return (
    <Navigation>
      
    </Navigation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'yellow',
    paddingHorizontal: 50,
    paddingVertical: 10
  }
});
