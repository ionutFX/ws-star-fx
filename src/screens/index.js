import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './LoginScreen';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const AuthNavigator = createStackNavigator(
    { 
        Login: LoginScreen,
        Register: RegisterScreen,
        ForgotPassword: ForgotPasswordScreen
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
    }
);

const TabNavigator = createBottomTabNavigator({
    Home: HomeScreen
});

const MainNavigator = createStackNavigator({
    Tab: TabNavigator
});

const AppNavigator = createSwitchNavigator(
    {
        Welcome: WelcomeScreen,
        Auth: AuthNavigator,
        Main: MainNavigator
    },
    {
        initialRouteName: 'Welcome'
    } 
);

const Navigation  = createAppContainer(AppNavigator);

export default Navigation