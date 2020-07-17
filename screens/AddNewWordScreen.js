import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as wordsActions from '../store/actions/newCards';

import Colors from '../constants/Colors';


const AddNewWordScreen = props => {
    const dispatch = useDispatch();

    addNewWord = async () => {
        // const token = getState().auth.token;
        // const userId = getState().auth.userId;

        // const response = await fetch(
        //     `https://dani-2.firebaseio.com/words.json`,
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             word: "Mr Manager",
        //             ownerId: 'saron'
        //         })
        //     });
        // const id= "1234"
        const imageUrl = "https://i.pinimg.com/originals/31/dd/96/31dd961371211e1f04e333a772277153.jpg";
        const word = "Fantastic";
        const phonetic = "fantastic four"
        const voiceRecord = "dummy text";
        const color = "#03ADE9";
        const category = "talk";
        
        dispatch(wordsActions.createWord(category, word, phonetic, voiceRecord, color, imageUrl));
        Alert.alert("New word added. Check the Database for results." )
        // console.log(response);
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.addImage}>Add Image</Text>
            <TextInput placeholder="Word" style={styles.wordInput} />
            <TextInput placeholder="Phonetic" style={styles.wordInput} />
            <TextInput placeholder="Record Voice" style={styles.wordInput} />
            <TextInput placeholder="Color" style={styles.wordInput} />
            <TextInput placeholder="Category" style={styles.wordInput} />
            <TouchableOpacity style={styles.button} onPress={addNewWord}>
                <Text>Add Word</Text>
            </TouchableOpacity>
        </View>
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
        // justifyContent: 'center',
        alignItems: 'center'
    },
    addImage: {
        height: 200,
        width: 200,
        borderWidth: 2,
        borderColor: Colors.border,
        margin: 10
    },
    wordInput: {
        borderWidth: 1,
        borderRadius: 5,
        width: '80%',
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