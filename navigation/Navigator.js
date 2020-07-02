import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import SplashScreen from './../screens/SplashScreen';
import LoginScreen from './../screens/LoginScreen';
import MainMenuScreen from './../screens/MainMenuScreen';
import SoundsMenuScreen from './../screens/SoundsMenuScreen';
import Colors from './../constants/Colors';

const defaultStackNavOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "",
        },
        headerTintColor: Colors.primaryColor,
        headerTitle: 'A Screen'
    }
}

const MainNavigator = createStackNavigator({
    Splash: SplashScreen,
    Login: LoginScreen,
    MainMenu: MainMenuScreen,
    SoundMenu: SoundsMenuScreen

}, {
    defaultNavigationOptions: defaultStackNavOptions
}
)


export default createAppContainer(MainNavigator);