import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as wordsCardActions from '../store/actions/newCards';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;

const EditNewWordScreen = props => {
    const [state, setState] = useState({
        word: 'this word',
        phonetic: 'this phonetic',
        categoryId: 'this cat',
        imageUrl: 'something',
        id: ''
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [pickedImage, setPickedImage] = useState();
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

    // const takeImageHandler = async () => {
    //     const hasPermission = await verifyPermissions();
    //     if (!hasPermission) {
    //         return;
    //     }
    //     const image = await ImagePicker.launchCameraAsync({
    //         allowsEditing: true,
    //         aspect: [16, 9],
    //         quality: 0.5
    //     });
    //     setPickedImage(image.uri);
    //     setState({ ...state, imageUrl: image.uri })
    // };

    const takeGalleryHandler = async () => {
        const hasPermission = await verifyPermissions();
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
        setState({ ...state, imageUrl: gallery.uri })
    };
    const takeCameraHandler = async () => {
        const hasPermission = await verifyPermissions();
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
        setState({ ...state, imageUrl: camera.uri })
    };
    const onUpdateWord = () => {
        const fileName = pickedImage.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        setState({ ...state, imageUrl: newPath });

        dispatch(wordsCardActions.updateWord(
            state.id,
            state.categoryId,
            state.word,
            state.imageUrl,
            state.phonetic,
        ))
        props.navigation.navigate('Select');
    }

    const onDeleteWord = () => {
        dispatch(wordsCardActions.deleteWord(state.id));
        props.navigation.navigate('Select');
    }

    useEffect(() => {
        setState({
            id: editWord.id,
            word: editWord.word,
            phonetic: editWord.phonetic,
            categoryId: editWord.categoryId,
            imageUrl: editWord.imageUrl
        });
        setPickedImage(editWord.imageUrl);
    }, [setState]);

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={80} style={styles.screen}>
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
                <TouchableOpacity style={styles.imagePreview} onPress={() => setModalVisible(true)}>
                    <Image style={styles.image} source={{ uri: state.imageUrl }} />
                </TouchableOpacity>
                <DropDownPicker
                    items={[
                        { label: 'Talk', value: 'Talk' },
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
                    dropDownStyle={{backgroundColor: 'rgba(0,0,0, 0.75)'}}
                    placeholder={state.categoryId}
                    labelStyle={{
                        fontSize: 14,
                        textAlign: 'left',
                        color: 'white'
                    }}
                    onChangeItem={item => setState({ ...state, categoryId: item.value})}
                />
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
                {/* <Text style={styles.label}>Category</Text>
                <TextInput
                    onChangeText={text => setState({ ...state, categoryId: text })}
                    style={styles.wordInput}
                    selectionColor='rgba(250,250,250,.6)'
                    color={Colors.sesameRedOrange}
                    value={state.categoryId}
                /> */}
                <View style={styles.btnRow}>
                    <TouchableOpacity onPress={() => {
                        Alert.alert('Are you sure?', 'Do you really want to update this item?', [
                            { text: 'No', style: 'default' },
                            {
                                text: 'Yes',
                                style: 'destructive',
                                onPress: onUpdateWord
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
                                    onPress: onDeleteWord
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
export default EditNewWordScreen;