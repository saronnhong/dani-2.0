import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SentenceBar from '../../components/SentenceBar';
import * as Speech from 'expo-speech';
import * as wordActions from '../../store/actions/sentenceBar'
import Voices from '../../constants/Voices';
import { WORDS } from '../../data/words';
import Colors from '../../constants/Colors';
import * as newWordActions from '../../store/actions/newCards';


const SpeechBoard = (props) => {
    const catId = props.navigation.state.params.categoryId;
    let filteredList = WORDS.filter(word => word.categoryId == catId);

    const colorPicker = {
        "chat": Colors.sesameGreen, //sesame street green
        "i feel": Colors.sesameYellow, //sesame street orange
        "about me": "#B63136",
        "activities": Colors.sesameOrange, //sesame street yellow
        "food & drink": Colors.sesameGreen,
        "places": "#638F54",
        "colors": Colors.sesameGreen,
        "user words": "#f2c063",
        'numbers': Colors.sesameRedOrange,
        'core words': Colors.sesamePurple
    }
    const color = colorPicker[catId];

    const dispatch = useDispatch();

    const addToState = (word) => {
        dispatch(wordActions.addToBar(word));
    }

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    let userId = useSelector(state => state.auth.userId);
    let userWords = useSelector(state => state.word.userWords);
    let filteredUserWords = userWords.filter(word => word.categoryId.toLowerCase() == catId);
    filteredList = filteredList.concat(filteredUserWords);

    const loadWords = useCallback(async () => {
        setError(null);
        try {
            dispatch(newWordActions.fetchWords());
        } catch (err) {
            setError(err.message);
        }
    }, [dispatch, setError]);

    useEffect(() => {
        setIsLoading(true);
        loadWords().then(() => {
            setIsLoading(false);
        });

    }, [loadWords]);

    renderWordImageUrl = (word) => {
        if (word.phonetic) {
            return <Image style={styles.imageBtn} source={{ uri: word.imageUrl }} />
        } else {
            return <Image style={styles.imageBtn} source={word.imageUrl} />
        }
    }

    

    return (
        <View>
            <ScrollView style={styles.overall}>
                <SentenceBar />
                <View style={styles.screen}>
                    <View style={styles.wordRow}>
                        {filteredList.map(word =>
                            <TouchableOpacity key={word.id} onPress={() => {
                                Speech.speak(word.phonetic ? word.phonetic : word.word, {
                                    language: 'en',
                                    pitch: 1,
                                    rate: 1.2,
                                    voice: Voices.nicky
                                });
                                addToState(word);
                            }}>
                                <View style={{ ...styles.btnContainer, backgroundColor: color }}>

                                    {word.imageUrl != null && renderWordImageUrl(word)}

                                    {(word.word.length < 7 || (word.word).includes(char => char === " ")) ? <Text style={styles.btnText} >{word.word}</Text> : <Text style={styles.btnTextSmall} >{word.word}</Text>}
                                </View>

                            </TouchableOpacity>
                        )}
                        {catId === "user words" && userWords.map(word =>
                            <TouchableOpacity key={word.id} onPress={() => {
                                Speech.speak(word.phonetic ? word.phonetic : word.word, {
                                    language: 'en',
                                    pitch: 1,
                                    rate: 1,
                                    voice: Voices.nicky
                                });
                                addToState(word);
                            }}>
                                <View style={{ ...styles.btnContainer, backgroundColor: color }}>

                                    {word.imageUrl != null && renderWordImageUrl(word)}

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
        headerBackTitle: ' ',
        // headerRight: () => (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <Item title="Edit" iconName='ios-create' onPress={() => {
        //             navData.navigation.navigate('DeleteUserWord');
        //             // props.navigation.navigate({
        //             //     routeName: 'DeleteUserWord',
        //             // });
        //         }} />
        //     </HeaderButtons>
        // )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
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
        paddingTop: 10,

    },
    categoryTitle: {
        fontSize: 20,
        fontFamily: "open-sans-bold",
        marginVertical: 15,
    },
    overall: {
        height: "100%",
        // backgroundColor: 'rgba(255, 185, 64, .2)'
        backgroundColor: 'rgba(255, 185, 64, .3)',
    },
    button: {
        width: '50%',
        borderWidth: 4,
        borderRadius: 30,
        borderColor: Colors.border,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: Colors.sesameRed,
        marginTop: 100,
        alignItems: 'center'
    }
});

export default SpeechBoard;