import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';
import { WORDS } from '../data/words';
import Colors from '../constants/Colors';
import * as wordActions from '../store/actions/newCards'
import { LinearGradient } from 'expo-linear-gradient';


const SpeechMenu = (props) => {
    const categories = [
        {
            id: 1,
            cat: "Talk",
            imageUrl: require('../assets/images/speechboard/menu/chat-min.png'),
        },
        {
            id: 2,
            cat: "I Feel",
            imageUrl: require('../assets/images/speechboard/menu/feelings-min.png'),
        },
        {
            id: 3,
            cat: "About Me",
            imageUrl: require('../assets/images/speechboard/menu/self-min.png'),
        }, {
            id: 4,
            cat: "Activities",
            imageUrl: require('../assets/images/speechboard/menu/activities-min.png'),
        },
        {
            id: 5,
            cat: "Food & Drink",
            imageUrl: require('../assets/images/speechboard/menu/food-min.png'),
        },
        {
            id: 6,
            cat: "Numbers",
            imageUrl: require('../assets/images/speechboard/menu/numbers-min.png'),
        },
        {
            id: 7,
            cat: "Places",
            imageUrl: require('../assets/images/speechboard/menu/places-min.png'),
        },
        {
            id: 8,
            cat: "Colors",
            imageUrl: require('../assets/images/speechboard/menu/colors-min.png'),
        },
        {
            id: 9,
            cat: "Core Basic",
            imageUrl: null,
        },
        {
            id: 10,
            cat: "User Words",
            imageUrl: null,
        },
    ];

    // addNewWord = () => {
    //     props.navigation.navigate({
    //         routeName: 'AddNewWord'
    //     });
    // }

    return (

        <View style={styles.screen}>
            {/* <LinearGradient colors={Colors.gradientOrange} style={styles.gradient}> */}
                <View style={styles.wordRow}>
                    {categories.map(word =>
                        <TouchableOpacity key={word.id} onPress={() => {
                            Speech.speak(word.cat, {
                                language: 'en',
                                pitch: 1,
                                rate: 1,
                                voice: Voices.nicky
                            });
                            props.navigation.navigate({
                                routeName: 'SpeechBoard',
                                params: {
                                    categoryId: word.cat.toLowerCase()
                                }
                            });
                        }}>
                            <View style={styles.btnContainer} >
                                {word.imageUrl != null && <Image style={styles.imageBtn} source={word.imageUrl} />}
                                <Text style={styles.btnText}>{word.cat}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {/* <TouchableOpacity onPress={addNewWord}>
                       
                            <View style={{ ...styles.btnContainer, backgroundColor: Colors.sesameRed }} >
                                <Text style={styles.btnText}>Add New Word</Text>
                            </View>
                        
                    </TouchableOpacity> */}
                </View>
            {/* </LinearGradient> */}
        </View>
    )
};

SpeechMenu.navigationOptions = navData => {
    return {
        headerTitle: 'Speech Menu',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Edit" iconName='ios-add' onPress={() => {
                    navData.navigation.navigate('AddNewWord');
                }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    btnContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,

        borderWidth: 2,
        borderRadius: 30,
        borderColor: Colors.border,
        height: 110,
        width: 110,
        margin: 3,
        backgroundColor: 'rgba(0,0,0,.4)',
        overflow: 'hidden',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 14,
        fontFamily: 'open-sans-bold',
        paddingHorizontal: 6,
        color: 'white'

    },
    wordRow: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 30,
        flex: 1,
        backgroundColor: 'rgba(255, 185, 64, .2)'
    },
    categoryTitle: {
        fontSize: 20,
        fontFamily: "open-sans-bold",
        marginVertical: 15,

    },
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    imageBtn: {
        width: '90%',
        height: '72%'
    },
});

export default SpeechMenu;