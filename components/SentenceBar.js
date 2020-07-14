import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const SentenceBar = props => {
    const wordArr = props.sendWord;
    const imageArr = props.sendImage;
    const newSentence = wordArr.join(" ");
    const scrollViewRef = useRef();
    return (
        <View style={styles.overAll}>
            <ScrollView
                style={styles.content}
                horizontal={true}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                <TouchableOpacity onPress={() => {
                    Speech.speak(newSentence, {
                        language: 'en',
                        pitch: 1,
                        rate: 1,
                        voice: Voices.nicky
                    });
                }}>
                    <View style={styles.wordBoard}>
                        {wordArr.map((word, index) =>
                            <View key={index} style={{ ...styles.btnContainer, backgroundColor: "#26c6da" }} >
                                {imageArr[index] != null && <Image style={styles.imageBtn} source={{ uri: imageArr[index] }} />}
                                {(word.length < 7 || word.includes(char => char === " ")) ? <Text style={styles.btnText} >{word}</Text> : <Text style={styles.btnTextSmall} >{word}</Text>}
                            </View>
                        )}
                        {wordArr.length > 0 && <TouchableOpacity style={styles.deleteContainer} onPress={props.delete}>
                            <Ionicons style={styles.deleteBtn} name='ios-backspace' size={35} />
                        </TouchableOpacity>}
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    overAll: {
        justifyContent: 'center',
        alignItems: 'center'
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
        fontFamily: 'open-sans-bold',
        color: 'white',
    },
    btnTextSmall: {
        fontSize: 11,
        fontFamily: 'open-sans-bold',
        color: 'white',
    },
    wordBoard: {
        height: 100,
        flexDirection: 'row',
        paddingTop: 10
    },
    deleteBtn: {
        marginRight: 3,
        color: "#d32f2f"
    },
    deleteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});

export default SentenceBar;