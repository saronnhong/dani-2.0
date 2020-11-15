import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Text, ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert, TextInput, TouchableOpacity, Dimensions} from 'react-native';
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


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        convertDate(date);
    };


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const hideDatepicker = () => {
        setShow(false);
    }

    const convertDate = (date) => {
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getYear()
        let dateFormat = day + month + year
        console.log(month)
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
                {/* <View> */}

                    <TextInput
                        style={styles.datePicker}
                        placeholder='Date of Birth'
                        onFocus={() => showDatepicker()}
                        onBlur={() => hideDatepicker()}
                        value={date.toString()}
                        // value={convertDate(date)}
                    />
                    {/* <Button onPress={showDatepicker} title="Choose your date of birth" /> */}
                
                <View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
            </View>

            {/* <TextInput
                onChangeText={text => setState({ ...state, dateOfBirth: text })}
                style={styles.userInput}
                value={state.dateOfBirth}
            /> */}

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