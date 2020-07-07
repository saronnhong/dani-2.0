import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';
import { WORDS } from '../data/words';
import { Ionicons } from '@expo/vector-icons';



const SpeechBoard = (props) => {
    const catId = props.navigation.state.params.categoryId;
    const filteredList = WORDS.filter(word => word.categoryId == catId);

    const colorPicker = {
        "sentence starters": "#4caf50",
        "chat": "#fb8c00",
        "feelings": "#5e35b1"
    }
    const color = colorPicker[catId];
    const [wordBoard, setWordBoard] = useState([]);
    return (
        <View>
            <View style={styles.wordBoard}>
                {wordBoard.map((board, index) =>
                    <TouchableOpacity key={index} style={styles.btnContainer} onPress={() => {
                        Speech.speak("remove", {
                            language: 'en',
                            pitch: 1,
                            rate: 1,
                            voice: Voices.nicky
                        });
                    }}>
                        <Text style={{ ...styles.btnText, backgroundColor: "#26c6da" }} >{board}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.deleteContainer} onPress={() => {
                    Speech.speak("delete", {
                        language: 'en',
                        pitch: 1,
                        rate: 1,
                        voice: Voices.nicky
                    });
                    const temp = wordBoard.splice(0, wordBoard.length - 1);
                    setWordBoard(temp);
                }}>
                    <Ionicons style={styles.deleteBtn} name='ios-backspace' size={30} />
                </TouchableOpacity>
            </View>
            <ScrollView >
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
                            }}>
                                <View style={styles.btnContainer}>
                                    <Text style={{ ...styles.btnText, backgroundColor: color }} >{word.word}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

// SpeechBoard.navigationOptions = navData => {
//     return {
//         headerTitle: 'Speech Board',
//         headerRight: () => (
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
    },
    wordBoard: {
        height: 200,
        backgroundColor: "#fafafa",
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 10
    },
    deleteBtn: {
        marginRight: 30,
        color: "#d32f2f"
    },
    deleteContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    }
});

export default SpeechBoard;