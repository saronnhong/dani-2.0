import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SentenceBar from '../components/SentenceBar';
import * as Speech from 'expo-speech';
// import * as wordActions from '../store/actions/sentenceBar'
import Voices from '../constants/Voices';
import { WORDS } from '../data/words';
import Colors from '../constants/Colors';
import * as newWordActions from '../store/actions/newCards';
import AddNewWordScreen from '../screens/AddNewWordScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const windowWidth = Dimensions.get('window').width;

const SelectUserWordScreen = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    
    let userWords = useSelector(state => state.word.userWords);
    console.log(userWords);

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
        <View style={styles.editContainer}>
            <ScrollView >
                <View style={styles.wordRow}>
                    {userWords.map(word =>
                        <TouchableOpacity key={word.id} onPress={() => {
                            props.navigation.navigate('Edit',
                                {
                                    editWord: word
                                })
                        }}>
                            <View style={styles.btnContainer}>
                                <Image style={styles.imageBtn} source={{ uri: word.imageUrl }} />
                                {(word.word.length < 7 || (word.word).includes(char => char === " ")
                                ) ? (
                                        <Text style={styles.btnText} >{word.word}</Text>
                                    ) : (
                                        <Text style={styles.btnTextSmall} >{word.word}</Text>)}
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    )
};

SelectUserWordScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Select User Word',
        headerBackTitle: ' ',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Edit" iconName='ios-add' onPress={() => {
                    navData.navigation.navigate('AddNewWord');
                }} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    editContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 185, 64, .2)'
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 0,
        borderColor: Colors.border,
        height: windowWidth / 2.05,
        width: windowWidth / 2.05,
        margin: 1,
        paddingHorizontal: 3,
        backgroundColor: '#1976D2',
        overflow: 'hidden',
    },
    imageBtn: {
        width: '90%',
        height: '72%'
    },
    btnText: {
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        color: 'white',
    },
    btnTextSmall: {
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        color: 'white',
    },
    wordRow: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        paddingTop: 10
    }
});

export default SelectUserWordScreen;