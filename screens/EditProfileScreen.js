import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../store/actions/profile';
import Colors from '../constants/Colors';

const windowHeight = Dimensions.get('window').height;


const EditProfileScreen = props => {
    const dispatch = useDispatch();
    let currentProfile = useSelector(state => state.profile);

    const [state, setState] = useState({
        name: currentProfile.name,
        age: currentProfile.age,
        imageUrl: props.navigation.state.params.image,
        coverUrl: require('../assets/images/profileimages/coverphoto.jpg')
    });
    
    useEffect(() => { 
        setState({ ...state, imageUrl: props.navigation.state.params.image })
    }, [props.navigation.state.params.image]);

    
    const saveProfile = useCallback(async () => {
        dispatch(profileActions.updateProfile(state.name, state.age, state.imageUrl, state.coverUrl));
        Alert.alert("Profile has been saved!");
        props.navigation.navigate({ routeName: "Profile" });
    }, [state.name, state.age, state.imageUrl]);

    useEffect(() => { 
        setState({ ...state, imageUrl: props.navigation.state.params.image })
    }, [props.navigation.state.params.image]);

    useEffect(() => {
        props.navigation.setParams({ Save: saveProfile });
    }, [saveProfile])

    return (
        <View style={styles.screen}>
            <Image style={styles.cover} source={state.coverUrl} />
            <TouchableOpacity style={styles.imageContainer} onPress={() => {
                props.navigation.navigate('SelectImage',
                    {
                        userImage: 'profileImage'
                    })
            }}>
                <Image style={styles.profileImage} source={state.imageUrl} />
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
                    keyboardType="number-pad"
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
    }

});

export default EditProfileScreen;
