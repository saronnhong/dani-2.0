import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';
import { WORDS } from '../data/words';
import Colors from '../constants/Colors';
import * as wordActions from '../store/actions/newCards'


const SpeechMenu = (props) => {
    const categories = [
        {
            id: 1,
            cat: "Talk",
            url: null,
        },
        {
            id: 2,
            cat: "I Feel",
            url: null,
        },
        {
            id: 3,
            cat: "About Me",
            url: null,
        }, {
            id: 4,
            cat: "Activities",
            url: null,
        },
        {
            id: 5,
            cat: "Food & Drink",
            url: null,
        },
        {
            id: 6,
            cat: "Numbers",
            url: null,
        },
        {
            id: 7,
            cat: "Places",
            url: null,
        },
        {
            id: 8,
            cat: "Colors",
            url: null,
        },
        {
            id: 9,
            cat: "Core Basic",
            url: null,
        },
        {
            id: 10,
            cat: "User Words",
            url: null,
        },
    ];
    

    addNewWord = () => {
        props.navigation.navigate({
            routeName: 'AddNewWord'
        });
    }

    // if (!isLoading) {
    //     return (
    //       <View style={styles.screen}>
    //         <ActivityIndicator size='large' color={Colors.primaryColor} />
    //       </View>
    //     )
    //   }

    return (

        <View style={styles.screen}>
            <View style={styles.wordRow}>
            {/* {userWords.userWords.map(word =>
                    <TouchableOpacity key={word.id} onPress={() => {
                        Speech.speak(word.word, {
                            language: 'en',
                            pitch: 1,
                            rate: 1,
                            voice: Voices.nicky
                        });
                    }}>
                        <View style={styles.btnContainer}>
                            <Text style={{ ...styles.btnText, backgroundColor: "#f2c063" }}>{word.word}</Text>
                        </View>
                    </TouchableOpacity>
                )} */}


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
                        <View style={styles.btnContainer}>
                            <Text style={styles.btnText}>{word.cat}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={addNewWord}>
                    <View style={styles.btnContainer} >
                        <Text style={{ ...styles.btnText, backgroundColor: Colors.sesameRed }}>Add New Word</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,

    },
    btnText: {
        fontSize: 14,
        fontFamily: 'open-sans-bold',
        borderWidth: 1,
        borderRadius: 10,
        height: 110,
        width: 110,
        margin: 3,
        paddingHorizontal: 12,
        paddingTop: 45,
        backgroundColor: '#0F98DC',
        overflow: 'hidden',
        color: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    wordRow: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 10
    },
    categoryTitle: {
        fontSize: 20,
        fontFamily: "open-sans-bold",
        marginVertical: 15,

    }
});

export default SpeechMenu;