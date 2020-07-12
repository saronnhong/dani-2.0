import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import SentenceBar from '../components/SentenceBar';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';
import { WORDS } from '../data/words';
import Colors from '../constants/Colors';

const SpeechBoard = (props) => {
    const catId = props.navigation.state.params.categoryId;
    const filteredList = WORDS.filter(word => word.categoryId == catId);

    const colorPicker = {
        "talk": Colors.sesameGreen, //sesame street green
        "i feel": Colors.sesameYellow, //sesame street orange
        "about me": "#B63136",
        "activities": Colors.sesameOrange, //sesame street yellow
        "food & drink": Colors.sesameGreen,
        "places": "#638F54",
        "colors": "#ED67AE"
    }
    const color = colorPicker[catId];
    const [wordBoard, setWordBoard] = useState([]);
    const [imageBoard, setImageBoard] = useState([]);

    const onDelete = () => {
        // Speech.speak("delete", {
        //     language: 'en',
        //     pitch: 1,
        //     rate: 1,
        //     voice: Voices.nicky
        // });
        const temp = wordBoard.splice(0, wordBoard.length - 1);
        setWordBoard(temp);
    }

    return (
        <View>
            <ScrollView >
                <SentenceBar sendWord={wordBoard} sendImage={imageBoard} delete={onDelete} />
                <View style={styles.screen}>
                    <View style={styles.wordRow}>
                        {filteredList.map(word =>
                            <TouchableOpacity key={word.id} onPress={() => {
                                Speech.speak(word.word, {
                                    language: 'en',
                                    pitch: 1,
                                    rate: 1,
                                    voice: Voices.nicky
                                });
                                setWordBoard(sentence => sentence.concat(word.word));
                                setImageBoard(sentence => sentence.concat(word.imageUrl));
                            }}>

                                <View style={{ ...styles.btnContainer, backgroundColor: color }}>
                                    {word.imageUrl != null && <Image style={styles.imageBtn} source={{ uri: word.imageUrl }} />}
                                    {(word.word.length < 7 || (word.word).includes(char => char === " ")) ? <Text style={styles.btnText} >{word.word}</Text> : <Text style={styles.btnTextSmall} >{word.word}</Text>}
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

SpeechBoard.navigationOptions = navData => {
    return {
        headerTitle: 'Speech Board',
        headerBackTitle: ' '
        // headerRight: () => (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <Item title="Menu" iconName='ios-menu' onPress={() => {
        //             navData.navigation.toggleDrawer();
        //         }} />
        //     </HeaderButtons>
        // )
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
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.border,
        height: 80,
        width: 80,
        margin: 3,
        paddingHorizontal: 3,
        // backgroundColor: '#1976D2',
        overflow: 'hidden',
        paddingVertical: 3,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    imageBtn: {
        width: '90%',
        height: '72%'
    },
    btnText: {
        fontSize: 14,
        fontFamily: 'open-sans-bold',
        color: 'white',
    },
    btnTextSmall: {
        fontSize: 11,
        fontFamily: 'open-sans-bold',
        color: 'white',
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