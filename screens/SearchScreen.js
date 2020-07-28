import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Colors from '../constants/Colors';
import { WORDS } from '../data/words';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';

const SearchScreen = props => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    
    const searchForWord = async (text) => {
        setSearchResults([]);
        if(text.length <= 0){
            Alert.alert("Search field is empty! Please enter something to continue.");
            setSearchResults([]);
            return
        }
        // setSearchResults([]);
        let filteredArr = [];
        const newText = text.toLowerCase();
        
        for (let i = 0; i < WORDS.length; i++) {
            if (WORDS[i].word.toLowerCase().includes(newText)) {
                filteredArr.push(WORDS[i]);
            }
        }
        setSearchResults(filteredArr);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.searchContainer}>
                <TextInput
                    onChangeText={text => setSearch(text)}
                    style={styles.wordInput}
                    selectionColor={Colors.border}
                    color={Colors.border}
                    backgroundColor='rgba(250,250,250,.3)'
                    placeholder="search..."
                    returnKeyType='search'
                    onSubmitEditing={() => searchForWord(search)}
                />
            </View>
            <Button title="Search" onPress={() => searchForWord(search)} />

            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.scrollContainer}>
                    {searchResults.map(word =>
                        <TouchableOpacity key={word.id} onPress={() => {
                            Speech.speak(word.word, {
                                language: 'en',
                                pitch: 1,
                                rate: 1,
                                voice: Voices.nicky
                            });
                        }}>
                            <View style={styles.btnContainer} >
                                {word.imageUrl != null && <Image style={styles.imageBtn} source={word.imageUrl} />}
                                <Text style={styles.btnText}>{word.word}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>


        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255, 185, 64, .2)',

    },
    searchContainer: {
        marginTop: 50
    },
    scrollContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 40,
    },
    wordInput: {
        width: '90%',
        height: 50,
        paddingHorizontal: 20,
        borderColor: Colors.border,
        borderWidth: 1,
        marginHorizontal: 10
    },
    scrollViewContainer: {
        width: '100%',
        paddingTop: 10,
        
        backgroundColor: 'rgba(255, 185, 64, .2)'
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
    imageBtn: {
        width: '90%',
        height: '72%'
    },
});
export default SearchScreen;
