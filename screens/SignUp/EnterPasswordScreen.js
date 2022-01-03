import React, { useState } from 'react';
import { Text, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import * as profileActions from '../../store/actions/profile';
import * as analyticsActions from '../../store/actions/count';
import * as sentenceBarActions from '../../store/actions/sentenceBar';

const EnterPasswordScreen = props => {
    console.log(props.navigation.state.params.accountInfo)
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({
        password: ''
    });
    const accountInfo = props.navigation.state.params.accountInfo;

    const defaultImage = { default: "http://www.saronnhong.com/images/021-puzzle.png" }

    const [reveal, setReveal] = useState(true)
    const dispatch = useDispatch();
    const authHandler = async () => {
        setIsLoading(true);
        await dispatch(authActions.signup(accountInfo.email, state.password))
            .then(() => {
                dispatch(profileActions.createProfile(accountInfo.email, accountInfo.name, accountInfo.age, accountInfo.dateOfBirth, defaultImage.default, 'coverUrl'))
                    .then(() => dispatch(analyticsActions.createAnalytics())
                        .then(() => {
                            dispatch(sentenceBarActions.resetBar());
                            setIsLoading(false);
                            props.navigation.navigate({
                                routeName: 'SpeechMenu'
                            });
                            
                        }))
            })
            .catch(err => {
                alert(err);
                props.navigation.navigate({
                    routeName: 'CreateAccountScreen'
                });
            });
    }

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.screen}>
            <Text style={styles.title}>
                You'll need a password
            </Text>
            <Text style={styles.reminder}>Make sure it is 8 characters or more.</Text>
            <TextInput
                style={styles.userInput}
                onChangeText={text => setState({ ...state, password: text })}
                placeholder='Password'
                keyboardType='default'
                secureTextEntry={reveal}
            />
            <TouchableOpacity style={styles.revealPasswordContainer} onPress={() => setReveal(!reveal)}>
                <Text style={styles.revealPassword}>{reveal ? 'Reveal password' : 'Hide password'}</Text>
            </TouchableOpacity>
            {isLoading ?
                <ActivityIndicator size="large" color={Colors.primary} />
                :
                <TouchableOpacity style={styles.nextButton} onPress={authHandler}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            }

        </KeyboardAvoidingView>
    )
};

EnterPasswordScreen.navigationOptions = {
    headerTitle: 'Enter Password'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 185, 64, .15)',
    },
    title: {
        fontSize: 24,
        fontFamily: 'roboto-bold',
        marginTop: 50,
        marginBottom: 30
    },
    reminder: {
        color: Colors.border
    },
    userInput: {
        width: '85%',
        marginTop: 30,
        height: 50,
        paddingHorizontal: 2,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        color: Colors.border
    },
    revealPasswordContainer: {
        display: 'flex',
        width: '85%',
        alignItems: 'flex-end'
    },
    revealPassword: {
        color: Colors.sesameBlue,
        margin: 10
    },
    nextButton: {
        backgroundColor: Colors.sesameBlue,
        borderBottomColor: Colors.border,
        paddingVertical: 10,
        paddingHorizontal: 100,
        borderRadius: 20,
        marginTop: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'roboto-bold'
    }
});

export default EnterPasswordScreen;