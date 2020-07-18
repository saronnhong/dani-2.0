import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import * as wordsActions from '../store/actions/newCards';
import Colors from '../constants/Colors';


const AddNewWordScreen = props => {
    const [state, setState] = useState({})
    const dispatch = useDispatch();

    addNewWord = async () => {
        const imageUrl = "https://i.pinimg.com/originals/3c/fe/2c/3cfe2ca3268ddb6d8f0d6e5e61571591.jpg";
        const word = state.word;
        const phonetic = state.phonetic
        const voiceRecord = "dummy text voice recorder";
        const color = state.color;
        const categoryId = state.categoryId;

        dispatch(wordsActions.createWord(categoryId, word, imageUrl, phonetic, color, voiceRecord));
        console.log(state);
        Alert.alert("New word added. Check the Database for results.")
    }

    return (
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={50} style={styles.screen}>
            <View style={styles.screenContainer}>
                <Text style={styles.addImage}>Add Image</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, word: text })}
                    placeholder="Word"
                    style={styles.wordInput}
                />
                <TextInput
                    onChangeText={text => setState({ ...state, phonetic: text })}
                    placeholder="Phonetic"
                    style={styles.wordInput}
                />
                <TextInput
                    placeholder="Record Voice"
                    style={styles.wordInput}
                />
                <TextInput
                    onChangeText={text => setState({ ...state, color: text })}
                    placeholder="Color"
                    style={styles.wordInput}
                />
                <TextInput
                    onChangeText={text => setState({ ...state, categoryId: text })}
                    placeholder="Category"
                    style={styles.wordInput}
                />
                <TouchableOpacity style={styles.button} onPress={addNewWord}>
                    <Text>Add Word</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
};
AddNewWordScreen.navigationOptions = navData => {
    return {
        headerTitle: 'New Word',
        headerBackTitle: 'Cancel'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    screenContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImage: {
        height: 200,
        width: 200,
        borderWidth: 2,
        borderColor: Colors.border,
        margin: 10,
    },
    wordInput: {
        borderWidth: 1,
        borderRadius: 5,
        width: '90%',
        height: 40,
        margin: 5,
        paddingLeft: 15
    },
    button: {
        borderWidth: 4,
        borderRadius: 30,
        borderColor: Colors.border,
        paddingHorizontal: 100,
        paddingVertical: 20,
        backgroundColor: Colors.sesameYellow
    }
});
export default AddNewWordScreen;