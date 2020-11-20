import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Text, ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { set } from 'lodash';

const windowWidth = Dimensions.get('window').width;
const CreateAccountScreen = props => {
    const [state, setState] = useState({
        name: '',
        email: '',
        dateOfBirth: '',
    });

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onPickDate = (event, selectedDate) => {
        setDate(selectedDate);
        var newDate = new Date(selectedDate)
        let mm = newDate.getMonth() + 1;
        let dd = newDate.getDate();
        let year = newDate.getFullYear()
        let formatedDate = mm + "/" + dd + "/" + year;
        setState({ ...state, dateOfBirth: formatedDate })
    };


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const hideDatepicker = () => {
        setShow(false);
    }


    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.screen}>
            <Text style={styles.title}>
                Create your account
            </Text>
            <TextInput
                onChangeText={text => setState({ ...state, name: text })}
                style={styles.userInput}
                value={state.name}
                placeholder='Name'
            />
            <TextInput
                onChangeText={text => setState({ ...state, email: text })}
                style={styles.userInput}
                value={state.email}
                placeholder='Email'
                keyboardType='email-address'
            />
            <View>
                <TextInput
                    style={styles.datePicker}
                    placeholder='Date of Birth'
                    onFocus={() => showDatepicker()}
                    onBlur={() => hideDatepicker()}
                    value={state.dateOfBirth}
                />
                <View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onPickDate}
                        />
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={() => {
                props.navigation.navigate({
                    routeName: 'EnterPasswordScreen',
                    params: {
                        accountInfo: state
                    }
                });
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
    nextButton: {
        backgroundColor: Colors.sesameBlue,
        borderBottomColor: Colors.border,
        paddingVertical: 10,
        paddingHorizontal: 100,
        borderRadius: 20,
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'roboto-bold'
    },
    datePicker: {
        width: windowWidth * 0.85,
        height: 50,
        paddingHorizontal: 2,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        color: Colors.border
    }
});

export default CreateAccountScreen;