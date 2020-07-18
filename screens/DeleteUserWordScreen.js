import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SentenceBar from '../components/SentenceBar';
import * as Speech from 'expo-speech';
// import * as wordActions from '../store/actions/sentenceBar'
import Voices from '../constants/Voices';
import { WORDS } from '../data/words';
import Colors from '../constants/Colors';
import * as newWordActions from '../store/actions/newCards';
import { LinearGradient } from 'expo-linear-gradient';
import * as wordsCardActions from '../store/actions/newCards'

const DeleteUserWordScreen = (props) => {
    
    const color = "#ED67AE";
    const dispatch = useDispatch();

    const addToState = (word) => {
        dispatch(wordActions.addToBar(word));
    }

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    let userWords = useSelector(state => state.word.userWords);

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

    



    return (
        <View>
            <LinearGradient colors={Colors.gradientOrange} style={styles.gradient}>
                <ScrollView >
                    {/* <SentenceBar /> */}
                    <View style={styles.screen}>
                        <View style={styles.wordRow}>
                            {userWords.map(word =>
                                <TouchableOpacity key={word.id} onPress={() => {
                                    Speech.speak("do you want to delete this card from your database", {
                                        language: 'en',
                                        pitch: 1,
                                        rate: 1,
                                        voice: Voices.nicky
                                    });
                                    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
                                        { text: 'No', style: 'default' },
                                        {
                                          text: 'Yes',
                                          style: 'destructive',
                                          onPress: () => {
                                            dispatch(wordsCardActions.deleteWord(word.id));
                                          }
                                        }
                                      ]);
                                }}>
                                    <View style={{ ...styles.btnContainer, backgroundColor: color }}>
                                        {word.imageUrl != null && <Image style={styles.imageBtn} source={{ uri: word.imageUrl }} />}
                                        {(word.word.length < 7 || (word.word).includes(char => char === " ")) ? <Text style={styles.btnText} >{word.word}</Text> : <Text style={styles.btnTextSmall} >{word.word}</Text>}
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    
                        <View style={{ flex: 1, alignItems: 'center'}}>
                            <TouchableOpacity style={styles.button} onPress={onDelete}>
                                <Text style={{color: 'white', fontFamily: 'open-sans-bold'}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    
                </ScrollView>
            </LinearGradient>
        </View>
    )
};

DeleteUserWordScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Delete A User Word',
        headerBackTitle: ' '
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
    },
    gradient: {
        height: "100%"
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

export default DeleteUserWordScreen;