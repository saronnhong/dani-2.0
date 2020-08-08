import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as profileActions from '../store/actions/profile';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

const EditProfileScreen = props => {
    const [state, setState] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [pickedImage, setPickedImage] = useState();

    let profileUpdate = useSelector(state => state.profile.profileInfo)
    const dispatch = useDispatch();

    const verifyPermissions = async (permissionType) => {
        const result = await Permissions.askAsync(Permissions[permissionType]);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
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

    // const { name, age, imageUrl } = state;
    // console.log(state.imageUrl);

    onUpdateProfile = () => {
        let fileName = pickedImage.split('/').pop();
        let newPath = FileSystem.documentDirectory + fileName;
        setState({ ...state, imageUrl: newPath });

        dispatch(profileActions.updateProfile(
            state.name,
            state.age,
            newPath
        ))
        props.navigation.navigate('Profile');
        console.log(state);
        console.log(profileUpdate);
    }

    useEffect(() => {
        setState({
            name: profileUpdate.name,
            age: profileUpdate.age,
            imageUrl: profileUpdate.imageUrl
        });
    }, [setState]);

    return (
        <View style={styles.screen}>
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

            <View style={styles.authContainer}>
                <TouchableOpacity style={styles.imagePreview} onPress={() => setModalVisible(true)} >
                    {!pickedImage ? <Text>No Image was picked yet.</Text> :
                        <Image style={styles.image} source={{ uri: pickedImage }} />}
                </TouchableOpacity>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, name: text })}
                    style={styles.wordInput}
                    selectionColor='rgba(250,250,250,.6)'
                    color={Colors.sesameRedOrange}
                    value={state.name}
                />

                <Text style={styles.label}>Age</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, age: text })}
                    style={styles.wordInput}
                    selectionColor='rgba(250,250,250,.6)'
                    color={Colors.sesameRedOrange}
                    value={state.age}
                />
            </View>
            <Button title='Save' onPress={onUpdateProfile} />
        </View>
    )

};


EditProfileScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Edit Profile',
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

export default EditProfileScreen;
