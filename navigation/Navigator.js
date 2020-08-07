import React from 'react';
import { SafeAreaView, Button, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import AuthScreen from './../screens/AuthScreen';
import MainMenuScreen from './../screens/Sounds/MainMenuScreen';
import SoundsMenuScreen from './../screens/Sounds/SoundsMenuScreen';
import SoundScreen from './../screens/Sounds/SoundScreen';
import SpeechBoard from './../screens/SpeechBoard/SpeechBoard';
import SpeechMenu from './../screens/SpeechBoard/SpeechMenu';
import AddNewWord from './../screens/SpeechBoard/AddNewWordScreen';
import SelectUserWord from './../screens/SpeechBoard/SelectUserWordScreen';
import EditUserWord from './../screens/SpeechBoard/EditNewWordScreen';
import SearchScreen from '../screens/SpeechBoard/SearchScreen';
import StartupScreen from '../screens/StartUpScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Options from '../components/Options';
import EditProfileScreen from '../screens/EditProfileScreen';
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
    SpeechBoard: SpeechBoard
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
    Edit: EditUserWord,
    AddNewWord: AddNewWord
    
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
const SearchNavigator = createStackNavigator({
    Search: SearchScreen,
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
    // Tab0: {
    //     screen: SpeechBoardNavigator,
    //     navigationOptions: {
    //         tabBarLabel: 'Menu',
    //         tabBarIcon: (tabInfo) => {
    //             return <Ionicons name='ios-apps' size={25} color={tabInfo.tintColor} />
    //         },
    //         tabBarColor: Colors.accentColor,
    //         tabBarOptions: {
    //             activeTintColor: 'white',
    //             inactiveTintColor: Colors.border,
    //             style: {
    //                 backgroundColor: Colors.gradientOrangeBottom,
    //             },
    //         },
    //     }
    // },
    Tab1: {
        screen: SearchNavigator,
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
            // tabBarOnPress: () => {
            //     console.log("search has been pressed");
            // }
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


const SettingsNavigator = createStackNavigator({
    Settings: SettingsScreen,
    Options: Options
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.orange,
        },
        headerTintColor: "white", 
        headerTitle: ''
    }
})

const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.orange,
        },
        headerTintColor: "white", 
        headerTitle: ''
    }
})

const MainNavigator = createDrawerNavigator({
    "Speech Board": TabNavigator,
    Profile: ProfileNavigator,
    Sound: DaniStackNavigator,
    Settings: SettingsNavigator
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