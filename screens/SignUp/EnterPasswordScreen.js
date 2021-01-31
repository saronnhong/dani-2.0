import React, { useState } from 'react';
import { Text, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { IMAGES } from '../../data/profileimg';
import * as authActions from '../../store/actions/auth';
import * as profileActions from '../../store/actions/profile';
import * as analyticsActions from '../../store/actions/count';

const EnterPasswordScreen = props => {
    const [state, setState] = useState({
        password: ''
    });
    const accountInfo = props.navigation.state.params.accountInfo;

    const defaultImage = { default: require('../../assets/images/profileimages/default.png') }


    const [reveal, setReveal] = useState(true)
    const dispatch = useDispatch();
    const authHandler = async () => {

        await dispatch(authActions.signup(accountInfo.email, state.password))
            .then(() => {
                dispatch(profileActions.createProfile(accountInfo.email, accountInfo.name, accountInfo.age, accountInfo.dateOfBirth, defaultImage.default, 'coverUrl'));
                dispatch(analyticsActions.createAnalytics());
                props.navigation.navigate({
                    routeName: 'SpeechMenu'
                });
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
            <TouchableOpacity onPress={() => setReveal(!reveal)}>
                <Text style={styles.revealPassword}>{reveal ? 'Reveal password' : 'Hide password'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={authHandler}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
};

EnterPasswordScreen.navigationOptions = {
    headerTitle: 'Enter Password'
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
    reminder: {
        color: Colors.border
    },
    userInput: {
        // flex: 1,
        width: '85%',
        // backgroundColor: Colors.sesameGreen,
        marginTop: 30,
        height: 50,
        paddingHorizontal: 2,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        color: Colors.border
    },
    revealPassword: {
        color: Colors.sesameBlue,
        justifyContent: 'flex-end'
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