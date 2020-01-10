import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import RateUs from "../components/RateUs";
import ShareApp from "./ShareApp";
import Contact from "../components/Contact";

export default class Footer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RateUs />
        <ShareApp />
        <Contact />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
