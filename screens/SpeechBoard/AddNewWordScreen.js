import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import DropDownPicker from 'react-native-dropdown-picker';
import * as wordsActions from '../../store/actions/newCards';
import Colors from '../../constants/Colors';
import Card from '../../components/Card';
import { Ionicons } from '@expo/vector-icons';
// import { Audio } from 'expo-av';

const windowHeight = Dimensions.get('window').height;
console.log(windowHeight);

const AddNewWordScreen = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [state, setState] = useState({ word: null, phonetic: null, color: null, categoryId: null});
    const [pickedImage, setPickedImage] = useState();
    const dispatch = useDispatch();

    const verifyPermissions = async (permissionType) => {
        const result = await Permissions.askAsync(Permissions[permissionType]);
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

    const takeGalleryHandler = async () => {
        const hasPermission = await verifyPermissions('CAMERA_ROLL');
        if (!hasPermission) {
            return;
        }

        const gallery = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setModalVisible(!modalVisible);
        setPickedImage(gallery.uri);
    };
    const takeCameraHandler = async () => {
        const hasPermission = await verifyPermissions('CAMERA');
        if (!hasPermission) {
            return;
        }
        const camera = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setModalVisible(!modalVisible);
        setPickedImage(camera.uri);
    };


    addNewWord = async () => {
        const fileName = pickedImage.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

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

        if (state.word === null || state.categoryId === null || state.phonetic === null || pickedImage === null) {
            Alert.alert("Missing item in the form!");
            setPickedImage(null);
        } else {
            dispatch(wordsActions.createWord(categoryId, word, newPath, phonetic));
            Alert.alert("New word added. Check the Database for results.");
            props.navigation.navigate({
                routeName: 'Select'
            });
        }
    }
    

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={150} style={styles.screen}>
            <Modal
                style={styles.modalContainer}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={takeGalleryHandler}>
                                <Ionicons name='ios-phone-portrait' size={25} color={'grey'} style={styles.icon} />
                                <Text style={styles.modalText}>Open From Device</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={takeCameraHandler}>
                                <Ionicons name='ios-camera' size={25} color={'grey'} style={styles.icon} />
                                <Text style={styles.modalText}>Camera</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>

            <Card style={styles.authContainer}>
                <TouchableOpacity style={styles.imagePreview} onPress={() => setModalVisible(true)} >
                    {!pickedImage ? <Text>No Image was picked yet.</Text> :
                        <Image style={styles.image} source={{ uri: pickedImage }} />}
                </TouchableOpacity>
                <Text style={styles.label}>Category</Text>
                <DropDownPicker
                    items={[
                        { label: 'Chat', value: 'Chat' },
                        { label: 'I Feel', value: 'I Feel' },
                        { label: 'About Me', value: 'About Me' },
                        { label: 'Activities', value: 'Activities' },
                        { label: 'Food & Drink', value: 'Food & Drink' },
                        { label: 'Places', value: 'Places' },
                        { label: 'Colors', value: 'Colors' },
                        { label: 'Core Basic', value: 'Core Basic' }
                    ]}
                    containerStyle={{ height: 40, marginVertical: 5 }}
                    style={{ backgroundColor: 'rgba(0,0,0, 0.15)' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: 'rgba(0,0,0, 0.75)' }}
                    placeholder="Select an Item"
                    labelStyle={{
                        fontSize: 14,
                        textAlign: 'left',
                        color: 'white'
                    }}
                    onChangeItem={item => setState({ ...state, categoryId: item.value })}
                />
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
        marginTop: 10,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        // paddingHorizontal: 100,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'flex-start'
    },
    modalText: {
        paddingVertical: 15,
        fontFamily: 'open-sans',
        fontSize: 14,
    },
    icon: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: 75
    }
});
export default AddNewWordScreen;