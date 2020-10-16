import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Text, ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import * as profileActions from '../store/actions/profile';
import Input from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const authHandler = async () => {
        // console.log(formState.inputValues);
        let action;
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            if (isSignup){
                dispatch(profileActions.createProfile(formState.inputValues.email))
            }
            props.navigation.navigate('SpeechMenu');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });

        }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.screen}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Speech Board</Text>
            </View>

            <Card style={styles.authContainer}>
                <ScrollView keyboardShouldPersistTaps={'handled'} >
                    <Input
                        id='email'
                        label='E-Mail'
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize='none'
                        errorText="Please enter a valid email address"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        color='white'
                        useValidation={true}
                    />
                    <Input
                        id='password'
                        label='Password'
                        keyboardType='default'
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize='none'
                        errorText="Please enter a valid password"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        color='white'
                        clearTextOnFocus={true}
                        useValidation={true}

                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={authHandler}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={Colors.primary} />
                            ) : (
                                    <Button
                                        title={isSignup ? 'Sign Up' : 'Login'}
                                        color='white'
                                    />
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                            setIsSignup(prevState => !prevState)
                        }}>
                            <Button
                                title={`${isSignup ? 'Login' : 'Sign Up'}`}
                                color={Colors.sesameYellow}
                            />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </Card>
        </KeyboardAvoidingView>
    )
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'rgba(255, 185, 64, .2)',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 600,
        padding: 20,
        backgroundColor: 'rgba(0,0,0, 0.15)',
        marginBottom: '40%'
    },
    titleContainer:{
        marginVertical: 35
    },
    title: {
        fontFamily: 'honeybee',
        fontSize: 60,
        color: Colors.sesameGreen
    },
    buttonContainer: {
        marginTop: 10
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default AuthScreen;