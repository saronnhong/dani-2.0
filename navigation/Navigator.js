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
import SelectUserWord from './../screens/SelectUserWordScreen';
import EditUserWord from './../screens/EditNewWordScreen';
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
                backgroundColor: Colors.orange,
            },
            headerTintColor: "white",
            headerTitle: ''
        }
    }
)
const EditNavigator = createStackNavigator({
    Select: SelectUserWord,
    Edit: EditUserWord
    
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.orange,
            },
            headerTintColor: "white",
            headerTitle: ''
        }
    }
)
const tabScreenConfig = {
    // Main: {
    //     screen: DaniStackNavigator,
    //     navigationOptions: {
    //         tabBarLabel: 'Main',
    //         tabBarIcon: (tabInfo) => {
    //             return <Ionicons name='ios-easel' size={25} color={tabInfo.tintColor} />
    //         },
    //         tabBarColor: Colors.primaryColor,
    //         style: {
    //             backgroundColor: Colors.orange,
    //         },
    //     }
    // },
    Tab0: {
        screen: SpeechBoardNavigator,
        navigationOptions: {
            tabBarLabel: 'Menu',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-apps' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarOptions: {
                activeTintColor: 'white',
                inactiveTintColor: Colors.border,
                style: {
                    backgroundColor: Colors.gradientOrangeBottom,
                },
            },
        }
    },
    Tab1: {
        screen: SpeechBoardNavigator,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-search' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarOptions: {
                activeTintColor: 'rgb(255, 245, 227)',
                inactiveTintColor: Colors.border,
                style: {
                    backgroundColor: Colors.gradientOrangeBottom,
                },
            },
        }
    },
    Tab2: {
        screen: SpeechBoardNavigator,
        navigationOptions: {
            tabBarLabel: 'Speech Board',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-chatbubbles' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarOptions: {
                activeTintColor: 'rgb(255, 245, 227)',
                inactiveTintColor: Colors.border,
                style: {
                    backgroundColor: Colors.gradientOrangeBottom,
                },
            },
        }
    },
    Tab3: {
        screen: EditNavigator,
        navigationOptions: {
            tabBarLabel: 'Edit',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-create' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarOptions: {
                activeTintColor: 'rgb(255, 245, 227)',
                inactiveTintColor: Colors.border,
                style: {
                    backgroundColor: Colors.gradientOrangeBottom,
                },
            },
        }
    }
}

const TabNavigator = createBottomTabNavigator(tabScreenConfig, {
    initialRouteName: "Tab2",
    tabBarOptions: {
        activeTintColor: Colors.sesameRed
    }
});

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
});

const MainNavigator = createDrawerNavigator({
    Tab: TabNavigator,
    Filters: FiltersNavigator,
    Sound: DaniStackNavigator
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
            backgroundColor: Colors.orange,
        },
        headerTintColor: "white", 
        headerTitle: ''
    }
})

const Main2Navigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Tab2: MainNavigator
    // Main: MainNavigator
})

export default createAppContainer(Main2Navigator);