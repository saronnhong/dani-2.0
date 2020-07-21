import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as wordsCardActions from '../store/actions/newCards';
import Colors from '../constants/Colors';
import Card from '../components/Card';

const windowHeight = Dimensions.get('window').height;

const EditNewWordScreen = props => {
    const [state, setState] = useState({
        word: 'this word',
        phonetic: 'this phonetic',
        categoryId: 'this cat',
        imageUrl: 'something',
        id: ''
    })
    // const [pickedImage, setPickedImage] = useState();
    const dispatch = useDispatch();
    const editWord = props.navigation.state.params.editWord;

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
        // setPickedImage(image.uri);
        setState({ ...state, imageUrl: image.uri })
    };

    useEffect(() => {
        setState({
            id: editWord.id,
            word: editWord.word,
            phonetic: editWord.phonetic,
            categoryId: editWord.categoryId,
            imageUrl: editWord.imageUrl
        });
    }, [setState]);

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30} style={styles.screen}>
            <Card style={styles.authContainer}>
                <TouchableOpacity style={styles.imagePreview} onPress={takeImageHandler}>
                    <Image style={styles.image} source={{ uri: state.imageUrl }} />
                </TouchableOpacity>
                <Text style={styles.label}>Word</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, word: text })}
                    style={styles.wordInput}
                    selectionColor='rgba(250,250,250,.6)'
                    color={Colors.sesameRedOrange}
                    value={state.word}
                />
                <Text style={styles.label}>Phonetic</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, phonetic: text })}
                    style={styles.wordInput}
                    selectionColor='rgba(250,250,250,.6)'
                    color={Colors.sesameRedOrange}
                    value={state.phonetic}
                />
                <Text style={styles.label}>Category</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, categoryId: text })}
                    style={styles.wordInput}
                    selectionColor='rgba(250,250,250,.6)'
                    color={Colors.sesameRedOrange}
                    value={state.categoryId}
                />
                <View style={styles.btnRow}>
                    <TouchableOpacity onPress={() => {
                        Alert.alert('Are you sure?', 'Do you really want to update this item?', [
                            { text: 'No', style: 'default' },
                            {
                                text: 'Yes',
                                style: 'destructive',
                                onPress: () => {
                                    dispatch(wordsCardActions.updateWord(
                                        state.id,
                                        state.categoryId,
                                        state.word,
                                        state.imageUrl,
                                        state.phonetic,
                                    ))
                                    props.navigation.navigate('Select');
                                }
                            }
                        ]);
                    }}>
                        <View style={{ ...styles.button, backgroundColor: Colors.sesameGreen }}>
                            <Text style={{ color: 'white' }}>Update</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
                                { text: 'No', style: 'default' },
                                {
                                    text: 'Yes',
                                    style: 'destructive',
                                    onPress: () => {
                                        dispatch(wordsCardActions.deleteWord(state.id));
                                        props.navigation.navigate('Select');
                                    }
                                }
                            ]);
                        }}>
                        <View style={{ ...styles.button, backgroundColor: Colors.sesameRedOrange }}>
                            <Text style={{ color: 'white' }}>Delete</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </Card>
        </KeyboardAvoidingView>
    )
};
EditNewWordScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Edit Word',
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
        paddingHorizontal: 40,
        paddingVertical: 20,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
export default EditNewWordScreen;