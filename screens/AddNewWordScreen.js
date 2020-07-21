import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

import * as wordsActions from '../store/actions/newCards';

import Colors from '../constants/Colors';
import Card from '../components/Card';

const windowHeight = Dimensions.get('window').height;
console.log(windowHeight);

const AddNewWordScreen = props => {
    const [state, setState] = useState({ word: null, phonetic: null, color: null, categoryId: null });
    const [pickedImage, setPickedImage] = useState();
    const dispatch = useDispatch();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera perissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.uri);
        // props.onImageTaken(image.uri)
    };

    addNewWord = async () => {
        const fileName = pickedImage.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        console.log("old path: " + pickedImage);
        console.log("new path: " + newPath);

        try {
            await FileSystem.moveAsync({
              from: pickedImage,
              to: newPath
            });
          } catch (err) {
            console.log(err);
            throw err;
          }

        const word = state.word;
        const phonetic = state.phonetic
        const categoryId = state.categoryId;

        if (state.word === null || state.phonetic === null || state.categoryId === null) {
            Alert.alert("Missing item in the form!")
        } else {
            dispatch(wordsActions.createWord(categoryId, word, newPath, phonetic));
            // console.log(state);
            Alert.alert("New word added. Check the Database for results.")
            props.navigation.navigate({
                routeName: 'Select'
            })
        }
    }

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={80} style={styles.screen}>
            <Card style={styles.authContainer}>
                <TouchableOpacity style={styles.imagePreview} onPress={takeImageHandler}>
                    {!pickedImage ? <Text>No Image was picked yet.</Text> :
                        <Image style={styles.image} source={{ uri: pickedImage }} />}
                </TouchableOpacity>
                <Text style={styles.label}>Word</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, word: text })}
                    style={styles.wordInput}
                    selectionColor='rgba(250,250,250,.6)'
                    color='white'
                />
                <Text style={styles.label}>Phonetic</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, phonetic: text })}
                    style={styles.wordInput}
                    selectionColor='rgba(250,250,250,.6)'
                    color='white'
                />
                {/* <Text style={styles.label}>Recorded Voice</Text>
                        <TextInput
                            // placeholder="Record Voice"
                            style={styles.wordInput}
                            selectionColor='rgba(250,250,250,.6)'
                            color= 'white' 
                         /> */}
                {/* <Text style={styles.label}>Color</Text>
                        <TextInput
                            onChangeText={text => setState({ ...state, color: text })}
                            // placeholder="Color"
                            style={styles.wordInput}
                            selectionColor='rgba(250,250,250,.6)'
                            color= 'white'
                        /> */}
                <Text style={styles.label}>Category</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, categoryId: text })}
                    style={styles.wordInput}
                    selectionColor='rgba(250,250,250,.6)'
                    color='white'
                />
                <TouchableOpacity onPress={addNewWord}>
                    <View style={styles.button}>
                        <Text>Add Word</Text>
                    </View>
                </TouchableOpacity>
            </Card>
        </KeyboardAvoidingView>
    )
};
AddNewWordScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Create A New Word',
        headerBackTitle: 'Cancel'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'rgba(255, 185, 64, .2)',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    authContainer: {
        width: '85%',
        maxWidth: 400,
        maxHeight: windowHeight,
        padding: 20,
        backgroundColor: 'rgba(0,0,0, 0.15)',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    addImage: {
        height: 100,
        width: 100,
        borderWidth: 2,
        borderColor: Colors.border,
        marginTop: 10,
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 5,
        color: 'rgba(250,250,250,.6)'
    },
    wordInput: {
        width: '100%',
        height: 25,
        paddingHorizontal: 2,
        borderBottomColor: 'rgba(250,250,250,.3)',
        borderBottomWidth: 1,
    },
    button: {
        borderWidth: 2,
        borderRadius: 30,
        borderColor: Colors.border,
        paddingVertical: 20,
        backgroundColor: Colors.sesameYellow,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: "100%",
        height: "100%"
    }
});
export default AddNewWordScreen;