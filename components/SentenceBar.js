import React, { useRef, useState, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import * as wordActions from '../store/actions/sentenceBar';
import * as sentenceCountActions from '../store/actions/count'

const windowWidth = Dimensions.get('window').width;

const SentenceBar = props => {
    const [barStatus, setBarStatus] = useState(false);
    let currState = useSelector(state => state.bar.words);
    
    let wordArr = [];
    for (let i = 0; i < currState.length; i++) {
        if (currState[i].phonetic) {
            wordArr.push(currState[i].phonetic);
        } else {
            wordArr.push(currState[i].word);
        }
    }
    let newSentence = wordArr.join(" ");

    const scrollViewRef = useRef();
    const dispatch = useDispatch();
    let userSettings = useSelector(state => state.setting);
    let savedDictionary = useSelector(num => num.count.sentenceCount);

    let sentenceCounter = (sentence) => {
        if(!savedDictionary[sentence]){
            savedDictionary[sentence] = 1;
        }else{
            savedDictionary[sentence]++
        }
        dispatch(sentenceCountActions.updateSentenceCount(savedDictionary));
        // console.log(savedDictionary);
        // const sortable = Object.entries(savedDictionary).sort((a,b) => b[1]-a[1])
        // console.log(sortable[0]);  //returns sorted array
    }

    let readSentence = async () => {
        Speech.speak(newSentence, {
            language: 'en',
            pitch: userSettings.pitch,
            rate: userSettings.rate,
            voice: Voices[userSettings.voice]
        });
        sentenceCounter(newSentence);
    }

    let onDelete = async () => {
        dispatch(wordActions.removeFromBar());
        setBarStatus(!barStatus);
    };

    let renderWordImageUrl = (word) => {
        if (word.phonetic) {
            return <Image style={styles.imageBtn} source={{ uri: word.imageUrl }} />
        } else {
            return <Image style={styles.imageBtn} source={word.imageUrl} />
        }
    }

    return (
        <View style={styles.overAll}>
            <ScrollView
                style={styles.content}
                horizontal={true}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                <TouchableOpacity onPress={readSentence}>
                    <View style={styles.wordBoard}>
                        {currState.map((word, index) =>
                            <View key={index} style={{ ...styles.btnContainer, backgroundColor: "#26c6da" }} >
                                {word.imageUrl != null && renderWordImageUrl(word)}
                                {(word.word.length < 7 || word.word.includes(char => char === " ")) ? <Text style={styles.btnText} >{word.word}</Text> : <Text style={styles.btnTextSmall} >{word.word}</Text>}
                            </View>
                        )}
                        {currState.length > 0 && <TouchableOpacity style={styles.deleteContainer} onPress={onDelete}>
                            <Ionicons style={styles.deleteBtn} name='ios-backspace' size={35} />
                        </TouchableOpacity>}
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    overAll: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(250,250,250, .3)',
    },
    content: {
        flex: 1,
        height: 100
    },
    wordBoard: {
        height: 100,
        flexDirection: 'row',
        paddingTop: 10,
        minWidth: windowWidth * .95,
        paddingRight: 35

    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.border,
        height: 78,
        width: 78,
        margin: 2,
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
        fontFamily: 'roboto-bold',
        color: 'white',
    },
    btnTextSmall: {
        fontSize: 11,
        fontFamily: 'roboto-bold',
        color: 'white',
    },
    deleteContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        top: 25
    },
    deleteBtn: {
        marginRight: 3,
        color: "#d32f2f"
    },
});

export default SentenceBar;