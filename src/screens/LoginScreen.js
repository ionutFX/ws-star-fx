import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import * as yup from "yup";
import * as theme from "../constants/theme";

import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import Axios from "axios";
import Footer from "../components/Footer";
import WelcomeLogo from "../components/WelcomeLogo";
import { CheckBox } from "react-native-elements";
import * as Facebook from "expo-facebook";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label("Username")
    .min(3, `Username must have at least 3 characters.`)
    .required("You must provide an username."),
  password: yup
    .string()
    .label("Password")
    .min(4, `Password must have at least 4 characters.`)
    .required("You must provide a password.")
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }
  loginUserWithFacebook = async () => {
    try {
      await Facebook.initializeAsync("2522106701381609");

      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        Alert.alert("logged");
      } else {
        Alert.alert("err");
      }
    } catch ({ message }) {
      Alert.alert({ message });
    }
  };
  loginUser = () => {
    const { username, password } = this.state;
    this.props.navigation.navigate("Register");
    // validate data

    if (username === "" || password === "") {
      Alert.alert("Please provide an Username  Password.");
    } else {
      // make api call
      const user = { username: username, password: password };

      axios
        .post("http://192.168.146.106/wss/api/v1/login/", {
          username: username,
          password: password
        })
        .then(response => {
          console.warn(response.data);
        })
        .catch(error => {
          console.warn(error);
        });
    }
  };
  render() {
    const { username, password } = this.state;
    return (
      <ImageBackground
        source={require("../assets/images/background_abstract.png")}
        style={styles.bgImageComponent}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <WelcomeLogo />
          </View>

          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior="padding"
            enabled
          >
            <View>
            <Text style={{ color: "#fff", textAlign: "center", marginBottom:5 }}>Login into your account:  </Text>
            </View>
            <Formik
              initialValues={{
                password: "",
                username: ""
              }}
              onSubmit={values => {
                this.handleSubmit(values);
              }}
              validationSchema={validationSchema}
            >
              {({ handleChange, values, handleSubmit, errors }) => (
                <Fragment>
                  <FormInput
                    name="username"
                    value={values.username}
                    onChangeText={handleChange("username")}
                    placeholder="username"
                    autoCapitalize="none"
                    iconName="md-contact"
                    iconColor={theme.colors.primaryPink}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.input}
                  />
                  <ErrorMessage errorValue={errors.username} />
                  <FormInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder="password"
                    secureTextEntry
                    iconName="md-lock"
                    iconColor={theme.colors.primaryPink}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.input}
                  />
                  <ErrorMessage errorValue={errors.password} />
                  <View style={styles.buttonContainer}>
                    <FormButton
                      buttonType="outline"
                      onPress={handleSubmit}
                      title="Login"
                      buttonColor="#fff"
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingVertical: 5,
                      justifyContent: "flex-end"
                    }}
                  >
                    <Button
                      title="Forgot your password?"
                      type="clear"
                      titleStyle={{
                        color: "#ffb401",
                        borderBottomWidth: 1,
                        borderBottomColor: "#ffb401",
                        fontWeight: "normal",
                        fontSize: 12,
                        marginTop: -5
                      }}
                      onPress={() => {
                        this.props.navigation.navigate("ForgotPassword");
                      }}
                    />
                  </View>
                </Fragment>
              )}
            </Formik>
          </KeyboardAvoidingView>
          <View style={styles.fbContainer}>
            <Text style={styles.ORText}>OR</Text>
            <FormButton
              title="Login with Facebook"
              iconName="logo-facebook"
              buttonColor={theme.colors.white}
              iconColor={theme.colors.white}
              onPress={this.loginUserWithFacebook.bind(this)}
            />
          </View>

          <View style={styles.registerContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#fff" }}>Don't have an account?  </Text>

              <Text
                style={{
                  color: "#ffb401",
                  borderBottomWidth: .8,
                  borderBottomColor: "#ffb401"
                }}
                onPress={() => {
                  this.props.navigation.navigate("Register");
                }}
              >
                Sign Up!
              </Text>
            </View>
          </View>

          <View style={styles.footerContainer}>
            <Footer />
          </View>
          {this.state.showLoader && (
            <View style={styles.activityIndicatorOverlay}>
              <ActivityIndicator size={60} color={theme.colors.primaryPink} />
            </View>
          )}
        </View>
      </ImageBackground>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 25
  },
  logoContainer: {
    flex: 3.5
  },
  formContainer: {
    flex: 2.8
  },
  fbContainer: {
    flex: 1
  },
  registerContainer: {
    flex: 0.3,
    alignItems: "center"
  },
  footerContainer: {
    flex: 1.1
  },
  ORText: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 5
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 5,
    backgroundColor: "rgba(255,255,255, 0.5)",
    color: "#fff"
  },
  inputContainerStyle:{
    borderBottomWidth: 0,
    
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    textAlign: "center",
    backgroundColor: "#eee",
    justifyContent: "center",
    width: 200,
    margin: "auto"
  },
  bgImageComponent: {
    flex: 1
  }
});
