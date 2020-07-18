import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import AuthScreen from './../screens/AuthScreen';
import MainMenuScreen from './../screens/MainMenuScreen';
import SoundsMenuScreen from './../screens/SoundsMenuScreen';
import SoundScreen from './../screens/SoundScreen';
import SpeechBoard from './../screens/SpeechBoard';
import SpeechMenu from './../screens/SpeechMenu';
import AddNewWord from './../screens/AddNewWordScreen';
import DeleteUserWord from './../screens/DeleteUserWordScreen';
import FiltersScreen from './../screens/FiltersScreen';
import StartupScreen from '../screens/StartUpScreen';
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
    // Auth: AuthScreen,
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
    SpeechBoard: SpeechBoard,
    AddNewWord: AddNewWord,
    DeleteUserWord: DeleteUserWord
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f25c5c',
            },
            headerTintColor: "white",
            headerTitle: ''
        }
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
            tabBarColor: Colors.primaryColor,
            style: {
                backgroundColor: '#ffb940',
            },
        }
    },
    Tab1: {
        screen: SpeechBoardNavigator,
        navigationOptions: {
            tabBarLabel: 'Speech Menu',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-chatbubbles' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarOptions: {
                activeTintColor: Colors.sesameRed,
                style: {
                    backgroundColor: '#ffb940',
                },
            },
        }
    }
}

const TabNavigator = createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.sesameRed
    }
});

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
});

const MainNavigator = createDrawerNavigator({
    Settings: TabNavigator,
    Filters: FiltersNavigator
},
    {
        contentOptions: {
            activeTintColor: Colors.primary
        },
        contentComponent: props => {
            const dispatch = useDispatch();
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItems  {...props} />
                        <Button
                            title="Logout"
                            color={Colors.primary}
                            onPress={() => {
                                dispatch(authActions.logout());
                                // props.navigation.navigate('Auth');
                            }}
                        />
                    </SafeAreaView>
                </View>
            );
        }
    }
);

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#00b4f0',
        },
        headerTintColor: "white",
        headerTitle: ''
    }
})

const Main2Navigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Main: MainNavigator
})

export default createAppContainer(Main2Navigator);