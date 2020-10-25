import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Text, ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import * as profileActions from '../store/actions/profile';
import Input from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';



const UserInfo = props => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: '',
        age: '',
        imageUrl: require('../assets/images/profileimages/butterfly.png'),
        coverUrl: require('../assets/images/profileimages/coverphoto.jpg')
    });

    const saveProfile = useCallback(async () => {
        dispatch(profileActions.updateProfile(state.name, state.age, state.imageUrl, state.coverUrl));
        props.navigation.navigate('SpeechMenu');
    }, [state.name, state.age]);

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.screen}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>User Info</Text>
            </View>

            <Card style={styles.authContainer}>
                <ScrollView keyboardShouldPersistTaps={'handled'} >
                    <View style={styles.firstField}>
                        <Text style={styles.fieldName}>Name:</Text>
                        <TextInput
                            onChangeText={text => setState({ ...state, name: text })}
                            style={styles.userInput}
                            color={Colors.sesameGreen}
                            value={state.name}
                        />
                    </View>
                    <View style={styles.firstField}>
                        <Text style={styles.fieldName}>Age:</Text>
                        <TextInput
                            onChangeText={text => setState({ ...state, age: text })}
                            style={styles.userInput}
                            color={Colors.sesameGreen}
                            value={state.age}
                            keyboardType="number-pad"
                        />
                    </View>
                    {/* <Input
                        id='age'
                        label='Age'
                        keyboardType='numeric'
                        required
                        autoCapitalize='none'
                        errorText="Please enter your age"
                        // onInputChange={inputChangeHandler}
                        initialValue=""
                        color='white'
                        // useValidation={true}
                    /> */}

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={saveProfile}>
                            <Button
                                title='Save'
                                color={Colors.sesameGreen}
                            />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </Card>
        </KeyboardAvoidingView>
    )
};

UserInfo.navigationOptions = {
    headerTitle: 'User Info'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'rgba(255, 185, 64, .2)',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    userInput: {
        // flex: 1,
        width: '50%',
        // backgroundColor: Colors.sesameGreen,
        height: 25,
        paddingHorizontal: 2

    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 600,
        padding: 20,
        backgroundColor: 'rgba(0,0,0, 0.15)',
        marginBottom: '40%'
    },
    titleContainer: {
        marginVertical: 35
    },
    title: {
        fontFamily: 'honeybee',
        fontSize: 60,
        color: Colors.sesameGreen
    },
    buttonContainer: {
        marginTop: 10
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center'
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
    fieldName: {
        marginRight: 10,
        marginLeft: 10
        // flex: 1
    }

});

export default UserInfo;