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

import { Overlay } from "react-native-elements";
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label("Username")
    .min(3, `Username must have at least 3 characters.`)
    .required("You must provide an username."),
  email: yup
    .string()
    .label("Email")
    .email("Enter a valid email.")
    .required("Please enter a registered email."),
  password: yup
    .string()
    .label("Password")
    .min(4, `Password must have at least 4 characters.`)
    .required("You must provide a password.")
});

class RegisterScreen extends Component {
  state = {
    checked: false,
    showLoader: false,
    showConfirmationLink: false,
    confirmationLink: ""
  };
  goToLogin = () => this.props.navigation.navigate("Login");

  handleLink = link => {
    WebBrowser.openBrowserAsync(link);
    this.setState({ showConfirmationLink: false });
    this.props.navigation.navigate("Login");
  };

  handleSubmit = async values => {
    if (this.state.checked === true) {
      this.setState({ showLoader: true });
      // call api
      Axios.post("http://192.168.146.106/wss/api/v1/register/", { values })
        .then(response => {
          this.setState({
            showLoader: false,
            showConfirmationLink: true,
            confirmationLink: response.data
          });
        })
        .catch(error => {
          this.setState({ showLoader: false });
          console.warn(error);
        });
    } else {
      Alert.alert("You must accept terms and conditions");
    }
  };

  render() {
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
            style={styles.formcontainer}
            behavior="padding"
            enabled
          >
            <View>
              <Text style={styles.title}>
                Please create your account in order to start:
              </Text>
            </View>
            <Formik
              initialValues={{
                email: "",
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
                    returnKeyType="next"
                  />
                  <ErrorMessage errorValue={errors.username} />
                  <FormInput
                    name="email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholder="email"
                    autoCapitalize="none"
                    iconName="md-mail"
                    iconColor={theme.colors.primaryPink}
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.input}
                    
                  />
                  <ErrorMessage errorValue={errors.email} />
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
                      title="Create your account"
                      buttonColor="#fff"
                    />
                  </View>
                  <CheckBox
                    center
                    title="I agree with GDPR terms"
                    checked={this.state.checked}
                    onPress={() => {
                      this.setState({ checked: !this.state.checked });
                    }}
                    containerStyle={styles.checkboxContainer}
                    textStyle={styles.checkboxTextStyle}
                    checkedColor="#fff"
                  ></CheckBox>
                </Fragment>
              )}
            </Formik>
          </KeyboardAvoidingView>

          <View style={styles.footerContainer}>
            <Footer />
          </View>
          {this.state.showLoader && (
            <View style={styles.activityIndicatorOverlay}>
              <ActivityIndicator size={60} color={theme.colors.primaryPink} />
            </View>
          )}
          {this.state.showConfirmationLink && (
            <Overlay isVisible windowBackgroundColor="rgba(0, 0, 0, .5)">
              <Text style={{ color: "#000", fontSize: 16 }}>
                Please confirm your email by visiting this url:{" "}
              </Text>
              <Text
                style={{
                  color: "blue",
                  fontSize: 14,
                  textDecorationLine: "underline"
                }}
                onPress={() => {
                  this.handleLink(this.state.confirmationLink);
                }}
              >
                {this.state.confirmationLink}
              </Text>
            </Overlay>
          )}
        </View>
      </ImageBackground>
    );
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 25
  },
  logoContainer: {
    flex: 3
  },
  formContainer: {
    paddingHorizontal: 25,
    flex: 7
  },
  footerContainer: {
    flex: 1
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center"
  },
  input: {
    color: "#fff"
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    padding: 0,
    margin: 0
  },
  bgImageComponent: {
    flex: 1
  },
  checkboxContainer: {
    backgroundColor: "rgba(255,255,255, 0)",
    borderWidth: 0
  },
  checkboxTextStyle: {
    color: "#fff"
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
