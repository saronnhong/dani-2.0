import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import LoginScreen from './../screens/LoginScreen';
import MainMenuScreen from './../screens/MainMenuScreen';
import SoundsMenuScreen from './../screens/SoundsMenuScreen';
import SoundScreen from './../screens/SoundScreen';
import SpeechBoard from './../screens/SpeechBoard';
import SpeechMenu from './../screens/SpeechMenu';
import FiltersScreen from './../screens/FiltersScreen';
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

const DaniStackNavigator = createStackNavigator({
    Login: LoginScreen,
    MainMenu: MainMenuScreen,
    SoundMenu: SoundsMenuScreen,
    SoundScreen: SoundScreen
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const SpeechBoardNavigator = createStackNavigator({
    SpeechMenu: SpeechMenu,
    SpeechBoard: SpeechBoard
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)
const tabScreenConfig = {
    Main: {
        screen: DaniStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Main',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-easel' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Tab1: {
        screen: SpeechBoardNavigator,
        navigationOptions: {
            tabBarLabel: 'Speech Menu',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-chatbubbles' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    }
}

const TabNavigator = createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
});

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
});

const MainNavigator = createDrawerNavigator({
    Settings: TabNavigator,
    Filters: FiltersNavigator
});

export default createAppContainer(MainNavigator);