import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Text, ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert, Image, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import * as profileActions from '../store/actions/profile';
import * as analyticsActions from '../store/actions/count';
import * as sentenceBarActions from '../store/actions/sentenceBar';
import Input from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

// const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// const formReducer = (state, action) => {
//     if (action.type === FORM_INPUT_UPDATE) {
//         const updatedValues = {
//             ...state.inputValues,
//             [action.input]: action.value
//         }
//         const updatedValidities = {
//             ...state.inputValidities,
//             [action.input]: action.isValid
//         }
//         let updatedFormIsValid = true;
//         for (const key in updatedValidities) {
//             updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
//         }
//         return {
//             formIsValid: updatedFormIsValid,
//             inputValidities: updatedValidities,
//             inputValues: updatedValues
//         }
//     }
//     return state;
// };

const AuthScreen = props => {
    const [state, setState] = useState({
        email: '',
        password: '',
        validEmail: true,
        validPassword: true
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    // const [formState, dispatchFormState] = useReducer(formReducer, {
    //     inputValues: {
    //         email: '',
    //         password: ''
    //     },
    //     inputValidities: {
    //         email: false,
    //         password: false
    //     },
    //     formIsValid: false
    // });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const authHandler = async () => {
        setError(null);
        setIsLoading(true);
        try {
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (state.password.length < 5) {
                setState({ ...state, validPassword: false })
            }
            if (!emailRegex.test(state.email.toLowerCase())) {
                setState({ ...state, validEmail: false })
            }
            else {
                // dispatch(authActions.login(formState.inputValues.email, formState.inputValues.password))
                dispatch(authActions.login(state.email, state.password))
                    .then(() => {
                        dispatch(profileActions.fetchProfile())
                            .then(() => {
                                dispatch(analyticsActions.fetchAnalytics())
                                    .then(() => {
                                        dispatch(sentenceBarActions.resetBar());
                                        props.navigation.navigate('SpeechMenu');
                                    })
                            })
                    })
            }

            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            Alert("An Error has occurred");
            setIsLoading(false);
        }
    }

    // const inputChangeHandler = useCallback(
    //     (inputIdentifier, inputValue, inputValidity) => {
    //         dispatchFormState({
    //             type: FORM_INPUT_UPDATE,
    //             value: inputValue,
    //             isValid: inputValidity,
    //             input: inputIdentifier
    //         });

    //     }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.screen}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Speech Board</Text>
            </View>

            <Card style={styles.authContainer}>
                <ScrollView keyboardShouldPersistTaps={'handled'} >
                    {/* <Input
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

                    /> */}
                    <TextInput
                        onChangeText={text => setState({ ...state, email: text })}
                        style={styles.userInput}
                        value={state.email}
                        placeholder='Email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        required
                    />
                    {state.validEmail ? null : <View style={styles.errorContainer}><Text style={styles.errorText}>Invalid Email address</Text></View>}
                    <TextInput
                        onChangeText={text => setState({ ...state, password: text })}
                        style={styles.userInput}
                        value={state.password}
                        placeholder='Password'
                        keyboardType='default'
                        clearTextOnFocus={true}
                        secureTextEntry
                        autoCapitalize='none'
                        required
                    />
                    {state.validPassword ? null : <View style={styles.errorContainer}><Text style={styles.errorText}>Invalid Password</Text></View>}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={authHandler}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={Colors.primary} />
                            ) : (
                                <Button
                                    title='Login'
                                    color='white'
                                />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                            props.navigation.navigate('CreateAccountScreen')
                        }}>
                            <Button
                                title='Sign Up'
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
    // headerTitle: 'Authenticate',
    headerBackground: () => (
        <View style={styles.headerScreen}>
            <Image
                style={styles.header}
                source={require('../assets/images/dani_logo_01.png')}
            />
        </View>

    ),
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'rgba(255, 185, 64, .2)',
        alignItems: 'center'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginTop: 15
    },
    headerScreen: {
        flex: 1,
        backgroundColor: Colors.orange,
        justifyContent: 'center',
        alignItems: 'center',

    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 600,
        padding: 20,
        backgroundColor: 'rgba(0,0,0, 0.15)',
        marginBottom: '40%'
    },
    titleContainer: {
        marginVertical: 35
    },
    title: {
        fontFamily: 'honeybee',
        fontSize: 60,
        color: Colors.sesameGreen
    },
    userInput: {
        height: 45,
        color: Colors.border,
        paddingHorizontal: 3,
        borderBottomColor: 'rgba(250,250,250,.7)',
        borderBottomWidth: 1
    },
    buttonContainer: {
        marginTop: 10
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: 'roboto',
        color: Colors.sesameRedOrange,
        fontSize: 12
    }
});

export default AuthScreen;