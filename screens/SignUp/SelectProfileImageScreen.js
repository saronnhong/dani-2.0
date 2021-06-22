import React, { useState, useEffect, useCallback } from 'react';
import { Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import * as profileActions from '../../store/actions/profile';

const SelectProfileImageScreen = props => {
    const selectedImage = props.navigation.state.params.image;
    let userProfile = useSelector(sel => sel.profile);
    

    const [state, setState] = useState({
        name: "",
        age: "",
        dateOfBirth: "",
        imageUrl: props.navigation.state.params.image,
        coverUrl: require('../../assets/images/profileimages/coverphoto.jpg')
    });

    const dispatch = useDispatch();
    const saveProfile = useCallback(() => {
        dispatch(profileActions.updateProfile(state.name, state.age, state.dateOfBirth, state.imageUrl, state.coverUrl));
        props.navigation.navigate({ routeName: "SpeechMenu" });
    }, [state.name, state.age, state.dateOfBirth, state.imageUrl, state.coverUrl]);

    useEffect(() => {
        setState({
            ...state,
            name: userProfile.name,
            age: userProfile.age,
            dateOfBirth: userProfile.dateOfBirth,
            imageUrl: selectedImage
        })
        // console.log(state);
    }, [selectedImage]);
//    useEffect(() => {
//     if(selectedImage === 'newAccount'){
//         setState({ 
//             ...state,
//             name: userProfile.name,
//             age: userProfile.age,
//             imageUrl: require('../../assets/images/profileimages/default.png')
//         })
//     }
//     else{
//         setState({
//             ...state,
//             name: userProfile.name,
//             age: userProfile.age, 
//             imageUrl: selectedImage
//         })
//     }
//     console.log('here')
// },[selectedImage, userProfile])

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.screen}>
            <Text style={styles.title}>
                Choose your profile picture
            </Text>
            <Text style={styles.reminder}>Have a favorite photo?</Text>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('SelectImageScreenSU',
                    {
                        previousPage: 'createProfile'
                    })
            }}>
            {(selectedImage === 'newAccount') ? 
             <Image style={styles.profile} source={require('../../assets/images/profileimages/021-puzzle.png')}/> : 
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