import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { WORDS } from '../../data/words';
import { VERBS } from '../../data/verbs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import * as Speech from 'expo-speech';
import Voices from '../../constants/Voices';
import SentenceBar from '../../components/SentenceBar';
import * as wordActions from '../../store/actions/sentenceBar'

const SearchScreen = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSentenceBar, setShowSentenceBar] = useState(false);
    let userWords = useSelector(state => state.word.userWords);
    let userSettings = useSelector(state => state.setting);

    const dispatch = useDispatch();

    const addToState = (word) => {
        dispatch(wordActions.addToBar(word));
    }

    const searchForWord = (text, type) => {

        if (text.length === 0 && type === 'buttonSubmit') {
            Alert.alert("Search field is empty. Please enter what you are looking for.");
            setSearchResults([]);
            return;
        }
        let filteredArr = [];
        let filteredUserWordsArr = [];
        let filteredVerbArr = [];
        let exactMatch = [];
        const newText = text.toLowerCase();

        for (const word of WORDS) {
            if (word.word.toLowerCase() === newText) {
                exactMatch.push(word);
            }
            else if (word.word.toLowerCase().includes(newText)) {
                filteredArr.push(word);
            }
        }
        for (const userWord of userWords) {
            if (userWord.word.toLowerCase() === newText) {
                exactMatch.push(userWord);
            }
            else if (userWord.word.toLowerCase().includes(newText)) {
                filteredUserWordsArr.push(userWord);
            }
        }
        for (const verb of VERBS) {
            if (verb.word.toLowerCase() === newText) {
                exactMatch.push(verb);
            }
            else if (verb.word.toLowerCase().includes(newText)) {
                filteredVerbArr.push(verb);
            }
        }
        filteredArr = exactMatch.concat(filteredArr.concat(filteredUserWordsArr.concat(filteredVerbArr)));
        setSearchResults(filteredArr);
    }

    let renderWordImageUrl = (word) => {
        if (word.phonetic) {
            return <Image style={styles.imageBtn} source={{ uri: word.imageUrl }} />
        } else {
            return <Image style={styles.imageBtn} source={word.imageUrl} />
        }
    }

    return (
        <View style={styles.screen}>
            
            {showSentenceBar && <View style={{ height: 100, backgroundColor: 'rgba(255, 185, 64, .2)' }}>
                <SentenceBar />
            </View>}

            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        onChangeText={text => {
                            setSearch(text);
                            searchForWord(text, 'onChange');
                        }}
                        clearButtonMode={'while-editing'}
                        style={styles.wordInput}
                        selectionColor={Colors.border}
                        color={Colors.border}
                        backgroundColor='rgba(250,250,250,.3)'
                        placeholder="search..."
                        returnKeyType='search'
                        onSubmitEditing={() => searchForWord(search, 'buttonSubmit')}
                    />
                    
                </View>
                <Button title="Search" onPress={() => searchForWord(search)} />

                <View >
                    <View style={styles.scrollContainer}>
                        {searchResults.length === 0 && <Text style={styles.emptySearch}>No search results found.</Text>}
                        {searchResults.map(word =>
                            <TouchableOpacity key={word._id} onPress={() => {
                                Speech.speak(word.word, {
                                    language: 'en',
                                    pitch: 1,
                                    rate: 1,
                                    voice: Voices[userSettings.voice]
                                });
                                addToState(word);
                                setShowSentenceBar(true);
                            }}>
                                <View style={styles.btnContainer} >
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

SearchScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Search',
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
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255, 185, 64, .2)',

    },
    searchContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    scrollContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 40,
        flex: 1
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
    emptySearch: {
        marginTop: 100
    }
});
export default SearchScreen;
