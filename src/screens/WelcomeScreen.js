import React, { Component } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  AsyncStorage,
  Image, 
  ActivityIndicator
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import * as theme from "../constants/theme";
import FormButton from "../components/FormButton";
import { welcomeScreenImages } from "../constants/images";

class WelcomeScreen extends React.Component {
  state = {
    isReady: false,
    checkedLogin: true
  };

  cacheImages = images => {
    return images.map(image => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };

  _loadAssetsAsync = async () => {
    const imageAssets = this.cacheImages([
      welcomeScreenImages.logo,
      welcomeScreenImages.bottom
    ]);

    await Promise.all([...imageAssets]);
  };

  checkAuth = async () => {
    this.setState({ checkedLogin: false });
    const userToken = await AsyncStorage.getItem("token");
    this.setState({ checkedLogin: userToken });
    this.props.navigation.navigate(userToken ? "Main" : "Auth");
  };
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <LinearGradient
        colors={[theme.colors.primaryPink, theme.colors.gradientPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View
          style={{ flex: 5, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={welcomeScreenImages.logo}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <FormButton
            title="Click to Start"
            buttonColor="#fff"
            onPress={this.checkAuth}
          />
        </View>
        <View
          style={{ flex: 4, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("../assets/images/coverdesign.png")}
            style={{ width: 275, height: 275 }}
            resizeMode="contain"
          />
        </View>
        {!this.state.checkedLogin && (
          <View style={styles.activityIndicatorOverlay}>
            <ActivityIndicator size={60} color={theme.colors.primaryPink} />
          </View>
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  activityIndicatorOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.5)"
  }
});

export default WelcomeScreen;
