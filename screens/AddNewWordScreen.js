import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import * as wordsActions from '../store/actions/newCards';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/Card';

const windowHeight = Dimensions.get('window').height;
console.log( windowHeight);

const AddNewWordScreen = props => {
    const [state, setState] = useState({ word: null, phonetic: null, color: null, categoryId: null })
    const dispatch = useDispatch();

    addNewWord = async () => {
        const imageUrl = "https://i.pinimg.com/originals/3c/fe/2c/3cfe2ca3268ddb6d8f0d6e5e61571591.jpg";
        const word = state.word;
        const phonetic = state.phonetic
        // const voiceRecord = "dummy text voice recorder";
        // const color = state.color;
        const categoryId = state.categoryId;

        if (state.word === null || state.phonetic === null || state.categoryId === null) {
            Alert.alert("Missing item in the form!")
        } else {
            dispatch(wordsActions.createWord(categoryId, word, imageUrl, phonetic));
            console.log(state);
            Alert.alert("New word added. Check the Database for results.")
            props.navigation.navigate({
                routeName: 'SpeechMenu'
            })
        }

    }

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30} style={styles.screen}>
                <LinearGradient colors={Colors.gradientOrange} start={[.2,.2]} end={[.8,.8]}style={styles.gradient}>
                    <Card style={styles.authContainer}>
                        <Text style={styles.addImage}>Add Image</Text>
                        <Text style={styles.label}>Word</Text>
                        <TextInput
                            onChangeText={text => setState({ ...state, word: text })}
                            // placeholder="Word"
                            style={styles.wordInput}
                            selectionColor='rgba(250,250,250,.6)'
                            color='white'
                        />
                        <Text style={styles.label}>Phonetic</Text>
                        <TextInput
                            onChangeText={text => setState({ ...state, phonetic: text })}
                            // placeholder="Phonetic"
                            style={styles.wordInput}
                            selectionColor='rgba(250,250,250,.6)'
                            color='white'
                        />
                        {/* <Text style={styles.label}>Recorded Voice</Text>
                        <TextInput
                            // placeholder="Record Voice"
                            style={styles.wordInput}
                            selectionColor='rgba(250,250,250,.6)'
                            color= 'white' 
                         /> */}
                        {/* <Text style={styles.label}>Color</Text>
                        <TextInput
                            onChangeText={text => setState({ ...state, color: text })}
                            // placeholder="Color"
                            style={styles.wordInput}
                            selectionColor='rgba(250,250,250,.6)'
                            color= 'white'
                        /> */}
                        <Text style={styles.label}>Category</Text>
                        <TextInput
                            onChangeText={text => setState({ ...state, categoryId: text })}
                            // placeholder="Category"
                            style={styles.wordInput}
                            selectionColor='rgba(250,250,250,.6)'
                            color='white'
                        />
                        <TouchableOpacity onPress={addNewWord}>
                            <View style={styles.button}>
                                <Text>Add Word</Text>
                            </View>

                        </TouchableOpacity>

                    </Card>
                </LinearGradient>
            
        </KeyboardAvoidingView>
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
        flex: 1
    },
    gradient: {
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        height: '100%'

    },
    authContainer: {
        width: '85%',
        maxWidth: 400,
        maxHeight: windowHeight,
        padding: 20,
        backgroundColor: 'rgba(0,0,0, 0.15)',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    addImage: {
        height: 100,
        width: 100,
        borderWidth: 2,
        borderColor: Colors.border,
        marginTop: 10,
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 5,
        color: 'rgba(250,250,250,.6)'
    },
    wordInput: {
        width: '100%',
        height: 25,
        paddingHorizontal: 2,
        borderBottomColor: 'rgba(250,250,250,.3)',
        borderBottomWidth: 1,
    },
    button: {
        borderWidth: 4,
        borderRadius: 30,
        borderColor: Colors.border,
        // paddingHorizontal: 80,
        paddingVertical: 20,
        backgroundColor: Colors.sesameYellow,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default AddNewWordScreen;