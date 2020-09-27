import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as profileActions from '../store/actions/profile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { IMAGES } from '../data/profileimg.js';

const windowHeight = Dimensions.get('window').height;


const EditProfileScreen = props => {
    const dispatch = useDispatch();
    let currentProfile = useSelector(state => state.profile);

    let newImage = null;
    // console.log(props);
    if (props.navigation.state.params != undefined) {
        // console.log(props.navigation.state.params.image)
        newImage = props.navigation.state.params.image;
    }

    const [state, setState] = useState({
        name: currentProfile.name,
        age: currentProfile.age,
        imageUrl: '',
        coverUrl: require('../assets/images/profileimages/coverphoto.jpg')
    });

    const saveProfile = useCallback(async () => {
            dispatch(profileActions.updateProfile(state.name, state.age, state.imageUrl));
            Alert.alert("Profile has been saved!");
            props.navigation.navigate({ routeName: "Profile" });
            // console.log(state)
    }, [state.name, state.age, state.imageUrl, state.coverUrl]);

   
    useEffect(() => {
        props.navigation.setParams({ Save: saveProfile });
        console.log(state.imageUrl)
    }, [saveProfile, state.imageUrl])

    return (
        <View style={styles.screen}>
            <Image style={styles.cover} source={state.coverUrl} />
            <TouchableOpacity style={styles.imageContainer} onPress={() => {
                props.navigation.navigate('SelectImage',
                    {
                        userImage: 'profileImage'
                    })
            }}>
                <Image style={styles.profileImage} source = {state.imageUrl} />
            </TouchableOpacity>
            <View style={styles.firstField}>
                <Text style={styles.fieldName}>Name:</Text>
                <TextInput 
                    onChangeText={text => setState({ ...state, name: text })}
                    style={styles.userInput}
                    color={Colors.sesameBlue}
                    value={state.name}
                />
            </View>
            <View style={styles.firstField}>
                <Text style={styles.fieldName}>Age:</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, age: text })}
                    style={styles.userInput}
                    color={Colors.sesameBlue}
                    value={state.age}
                />
            </View>
        </View>
    )

};


EditProfileScreen.navigationOptions = navData => {
    const saveFunction = navData.navigation.getParam('Save');
    return {
        headerTitle: 'Edit Profile',
        headerRight: () => (
            <TouchableOpacity onPress={saveFunction}>
                <Text style={{ marginRight: 10, color: 'white', fontSize: 16 }}>Save</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    cover: {
        width: '100%',
        height: '20%',

    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: Colors.sesameGreen,
        borderRadius: 100,
        padding: 10,
        marginTop: -50,
        borderColor: 'white',
        borderWidth: 3
    },
    firstField: {
        flexDirection: 'row',
        // flex: 1,
        // justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: 'rgba(20,20,20,.2)',
        // height: 50
        paddingVertical: 10
    },
    userInput: {
        // flex: 1,
        width: '50%',
        // backgroundColor: Colors.sesameGreen,
        height: 25,
        paddingHorizontal: 2,
        borderBottomColor: 'rgba(250,250,250,.3)',
        borderBottomWidth: 1,
    },
    fieldName: {
        marginRight: 10,
        marginLeft: 10
        // flex: 1
    },

});

export default EditProfileScreen;
