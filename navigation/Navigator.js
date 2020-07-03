import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import SplashScreen from './../screens/SplashScreen';
import LoginScreen from './../screens/LoginScreen';
import MainMenuScreen from './../screens/MainMenuScreen';
import SoundsMenuScreen from './../screens/SoundsMenuScreen';
import FavoritesScreen from './../screens/FavoritesScreen';
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
    Splash: SplashScreen,
    Login: LoginScreen,
    MainMenu: MainMenuScreen,
    SoundMenu: SoundsMenuScreen

},
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const FavoritesNavigator = createStackNavigator({
    Favorites: FavoritesScreen
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
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Tab1: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
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
    MealsFavs: TabNavigator,
    Filters: FiltersNavigator
});

export default createAppContainer(MainNavigator);