import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';
import { WORDS } from '../data/words';


const SpeechBoard = () => {
    const thingToSay = 'And before anyone starts to panic, oh my god he is making videos in place of writing, OF COURSE I am still working on WINDS OF WINTER as well. ';

    // return (
    //     <View style={styles.container}>

    //         <Button 
    //         title="Press to hear some words" 
    //         onPress={() => Speech.speak(thingToSay, {
    //             language: 'en',
    //             pitch: 1,
    //             rate: 1,
    //             voice: Voices.nicky
    //         })} />
    //     </View>
    // )
    return (
        <View style={styles.screen}>
            {/* <Text style={styles.categoryTitle}>Speech Board</Text> */}
            <View style={styles.wordRow}>
                {WORDS.map(word =>
                    <TouchableOpacity key={word.id} onPress={() => Speech.speak(word.word, {
                        language: 'en',
                        pitch: 1,
                        rate: 1,
                        voice: Voices.nicky
                    })}>
                        <View style={styles.btnContainer}>
                            <Text style={styles.btnText}>{word.word}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
};

SpeechBoard.navigationOptions = navData => {
    return {
        headerTitle: 'Speech Board',
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

export default SpeechBoard;