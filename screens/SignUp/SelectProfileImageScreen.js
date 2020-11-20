import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Text, ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert, TextInput, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import * as profileActions from '../../store/actions/profile';

const SelectProfileImageScreen = props => {
    const selectedImage = props.navigation.state.params.image;

    let userProfile = useSelector(state => state.profile);
    console.log(userProfile)

    const [state, setState] = useState({
        name: userProfile.name,
        age: userProfile.age,
        imageUrl: props.navigation.state.params.image,
        coverUrl: require('../../assets/images/profileimages/coverphoto.jpg')
    });

    const dispatch = useDispatch();
    const saveProfile = useCallback(() => {
        dispatch(profileActions.updateProfile(state.name, state.age, state.imageUrl, state.coverUrl));
        props.navigation.navigate({ routeName: "SpeechMenu" });
    }, [state.name, state.age, state.imageUrl]);


    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.screen}>
            <Text style={styles.title}>
                Choose your profile picture
            </Text>
            <Text style={styles.reminder}>Have a favorite photo?</Text>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('SelectImage',
                    {
                        previousPage: 'createProfile'
                    })
            }}>
            {(selectedImage === 'newAccount') ? 
             <Image style={styles.profile} source={require('../../assets/images/profileimages/rainbow.png')}/> : 
              <Image style={styles.profile} source={selectedImage}/>
            } 
           
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={saveProfile}>
                <Text style={styles.buttonText}>Save Profile</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    )
};

SelectProfileImageScreen.navigationOptions = {
    headerTitle: 'Choose Profile Picture'
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
    profile:{
        borderRadius:100,
        width: 150,
        height: 150,
        borderWidth: 0.5,
        marginVertical: 50
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

export default SelectProfileImageScreen;