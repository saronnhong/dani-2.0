import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';
import { WORDS } from '../data/words';


const SpeechMenu = (props) => {
    const categories = [
        {
            id: 1,
            cat: "Sentence Starters",
            url: null
        },
        {
            id: 2,
            cat: "Core Basics",
            url: null
        },
        {
            id: 3,
            cat: "Chat",
            url: null,
        }, {
            id: 4,
            cat: "Feelings",
            url: null,
        },
        {
            id: 5,
            cat: "Activities",
            url: null,
        },
        {
            id: 6,
            cat: "Toys",
            url: null,
        },
        {
            id: 7,
            cat: "Food and Drink",
            url: null,
        },
        {
            id: 8,
            cat: "Places",
            url: null,
        },
        {
            id: 9,
            cat: "Who?",
            url: null,
        },
        {
            id: 10,
            cat: "Colors",
            url: null,
        },
        {
            id: 11,
            cat: "Numbers",
            url: null,
        },
        {
            id: 12,
            cat: "Shapes",
            url: null,
        }];

    return (

        <View style={styles.screen}>
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
                        <View style={styles.btnContainer}>
                            <Text style={styles.btnText}>{word.cat}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>

    )
};

// SpeechMenu.navigationOptions = navData => {
//     return {
//         headerTitle: 'Speech Menu',
//         headerLeft: () => (
//             <HeaderButtons HeaderButtonComponent={HeaderButton}>
//                 <Item title="Menu" iconName='ios-menu' onPress={() => {
//                     navData.navigation.toggleDrawer();
//                 }} />
//             </HeaderButtons>
//         )
//     }
// }

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
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
        height: 80,
        width: 80,
        margin: 3,
        paddingHorizontal: 10,
        paddingTop: 25,
        backgroundColor: '#1976D2',
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