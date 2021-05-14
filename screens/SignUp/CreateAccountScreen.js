import React, { useState} from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const windowWidth = Dimensions.get('window').width;

const CreateAccountScreen = props => {
    const [state, setState] = useState({
        name: '',
        email: '',
        age: '',
        dateOfBirth: '',
        birthMonth: '',
        birthDay: '',
        birthYear: ''
    });

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onPickDate = (event, selectedDate) => {
        // let userDob = state.birthMonth + state.birthDay + state.birthYear
        // setDate(selectedDate);
        var newDate = new Date(state.birthYear, state.birthMonth, state.birthDay);
        let mm = newDate.getMonth() + 1;
        let dd = newDate.getDate();
        let year = newDate.getFullYear()
        let formattedDate = mm + "/" + dd + "/" + year;

        var currentDate = new Date();
        var age = currentDate.getFullYear() - newDate.getFullYear()
        var m = currentDate.getMonth() - newDate.getMonth();
        if (m < 0 || (m === 0 && currentDate.getDate() < newDate.getDate())) {
            age--;
        }


        console.log(age);
        setState({
            ...state,
            dateOfBirth: formattedDate,
            age: age
        })
    };

    // const onPickDate = (selectedDate) => {
    //     setState({selectedDate})
    // }



    // const showMode = (currentMode) => {
    //     setShow(true);
    //     setMode(currentMode);
    // };

    // const showDatepicker = () => {
    //     showMode('date');
    // };

    // const hideDatepicker = () => {
    //     setShow(false);
    // }

    // let inputs = {};

    // let focusTheField = (id) => {
        
    //     inputs[id].focus();
    //   }


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
            <View style={styles.dobTitleContainer}>
                <Text style={styles.dobTitle}>Date of Birth</Text>
            </View>

            <View style={styles.dateRow}>
                <TextInput
                    style={styles.dateInput}
                    placeholder='mm'
                    keyboardType='numeric'
                    onChangeText={text => {
                        setState({ ...state, birthMonth: text });
                        // if (text.length === 2) focusTheField('field2');
                    }}
                    value={state.birthMonth}
                    maxLength={2}
                    // getRef={input => inputs['field1'] = input }
                    
                />

                <TextInput
                    style={styles.dateInput}
                    placeholder='dd'
                    keyboardType='numeric'
                    onChangeText={text => setState({ ...state, birthDay: text })}
                    value={state.birthDay}
                    maxLength={2}
                    // getRef={input => inputs['field2'] = input }
                
                />
                <TextInput
                    style={styles.dateInput}
                    placeholder='yyyy'
                    keyboardType='numeric'
                    onChangeText={text => setState({ ...state, birthYear: text })}
                    value={state.birthYear}
                    maxLength={4}
                    
                />
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={() => {
                onPickDate();
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
        width: '85%',
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
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: windowWidth * 0.85
    },
    dateInput: {
        width: windowWidth * 0.2,
        height: 50,
        paddingHorizontal: 2,
        marginRight: 10,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        color: Colors.border
    },
    dobTitleContainer: {
        marginTop: 20,
        width: windowWidth * 0.85,
        justifyContent: 'flex-start',
    }
});

export default CreateAccountScreen;