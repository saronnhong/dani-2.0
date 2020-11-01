import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Text, ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';


const CreateAccountScreen = props => {
    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.screen}>
            <Text style={styles.title}>
                Create your account
            </Text>
            <TextInput
                // onChangeText={text => setState({ ...state, name: text })}
                style={styles.userInput}
                value='Name'
            // value={state.name}
            />
            <TextInput
                // onChangeText={text => setState({ ...state, name: text })}
                style={styles.userInput}
                value="Email Address"
            // value={state.name}
            />
            <TextInput
                // onChangeText={text => setState({ ...state, name: text })}
                style={styles.userInput}
                value='Date of Birth'
            // value={state.name}
            />
            <TouchableOpacity style={styles.nextButton} onPress={() => {
                             props.navigation.navigate('EnterPasswordScreen')
                        }}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
               
        </KeyboardAvoidingView>
    )
};

CreateAccountScreen.navigationOptions = {
    headerTitle: 'Create Account'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontFamily: 'roboto-bold',
        marginTop: 50,
        marginBottom: 30
    },
    userInput: {
        // flex: 1,
        width: '85%',
        // backgroundColor: Colors.sesameGreen,
        height: 50,
        paddingHorizontal: 2,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        color: Colors.border
    },
    nextButton:{
        backgroundColor: Colors.sesameBlue,
        borderBottomColor: Colors.border,
        paddingVertical: 10,
        paddingHorizontal: 100,
        borderRadius: 20,
        marginTop: 40
    },
    buttonText:{
        color: 'white',
        fontSize: 18,
        fontFamily: 'roboto-bold'
    }
});

export default CreateAccountScreen;