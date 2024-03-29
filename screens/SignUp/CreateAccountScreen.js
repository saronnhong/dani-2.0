import React, { Component, useState } from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Colors from '../../constants/Colors';

const windowWidth = Dimensions.get('window').width;

class CreateAccountScreen extends Component {
    state = {
        name: '',
        email: '',
        age: '',
        dateOfBirth: '',
        birthMonth: '',
        birthDay: '',
        birthYear: ''
    };

    onPickDate = () => {
        let newDate = new Date(this.state.birthYear, this.state.birthMonth, this.state.birthDay);
        let mm = newDate.getMonth() + 1;
        let dd = newDate.getDate();
        let year = newDate.getFullYear()
        let formattedDate = mm + "/" + dd + "/" + year;

        let currentDate = new Date();
        let age = currentDate.getFullYear() - newDate.getFullYear()
        let m = currentDate.getMonth() - newDate.getMonth();
        if (m < 0 || (m === 0 && currentDate.getDate() < newDate.getDate())) {
            age--;
        }

        this.setState({
            ...this.state,
            dateOfBirth: formattedDate,
            age: age
        }, () => this.submitData())
    };

    submitData = () => {
        if (this.state.name.length === 0) {
            alert("No name entered.");
            this.refs['name'].focus()
        } else if (this.state.email.length === 0) {
            alert("No email entered.");
            this.refs['email'].focus()
        } else if (this.state.birthMonth.length === 0 || this.state.birthDay.length === 0 || this.state.birthYear.length === 0) {
            // alert("Invalid birthdate entered.");
            // this.refs['day'].focus()
            this.setState({
                ...this.state,
                birthMonth:  '1',
                birthDay: '1',
                birthYear: '2022',
                dateOfBirth: '01/01/2022',
                age: 0
            }, () => this.submitData());
        } else {
            // console.log("grabbing a new state", this.state)
            this.props.navigation.navigate({
                routeName: 'EnterPasswordScreen',
                params: {
                    accountInfo: this.state
                }
            });
        }

    }

    refs = {}

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={20} style={styles.screen}>
                <Text style={styles.title}>
                    Create your account
            </Text>
                <TextInput
                    onChangeText={text => this.setState({ ...this.state, name: text })}
                    style={styles.userInput}
                    value={this.state.name}
                    placeholder='Name'
                    ref="name"
                />
                <TextInput
                    onChangeText={text => this.setState({ ...this.state, email: text })}
                    style={styles.userInput}
                    value={this.state.email}
                    placeholder='Email'
                    keyboardType='email-address'
                    ref="email"
                />
                <View style={styles.dobTitleContainer}>
                    <Text style={styles.dobTitle}>Date of Birth</Text>
                </View>

                <View style={styles.dateRow}>
                    <TextInput
                        style={styles.dateInput}
                        placeholder='mm'
                        keyboardType='numeric'
                        onChangeText={text => {
                            this.setState({ ...this.state, birthMonth: text });
                            if (text.length === 2 && text > 0 && text <= 12 && !text.includes(".")) {
                                this.refs['day'].focus()
                            }
                            if (text.length === 2 && (text <= 0 || text > 12) || text.includes(".")) {
                                Alert.alert("Please enter a valid Month.")
                                this.setState({ ...this.state, birthMonth: "" });
                            }
                        }}
                        value={this.state.birthMonth}
                        maxLength={2}
                        ref="month"
                    />

                    <TextInput
                        style={styles.dateInput}
                        placeholder='dd'
                        keyboardType='numeric'
                        onChangeText={text => {
                            this.setState({ ...this.state, birthDay: text })
                            if (text.length === 2 && text > 0 && text <= 31 && !text.includes(".")) {
                                this.refs['year'].focus()
                            }
                            if (text.length === 2 && (text <= 0 || text > 31) || text.includes(".")) {
                                Alert.alert("Please enter a valid Day.")
                                this.setState({ ...this.state, birthDay: "" });
                            }
                        }}
                        value={this.state.birthDay}
                        maxLength={2}
                        ref="day"
                    />
                    <TextInput
                        style={styles.dateInput}
                        placeholder='yyyy'
                        keyboardType='numeric'
                        onChangeText={text => {
                            this.setState({ ...this.state, birthYear: text })
                            if (text.length === 4 && (text <= 1900 || text > 2021) || text.includes(".")) {
                                Alert.alert("Please enter a valid Year.")
                                this.setState({ ...this.state, birthYear: "" });
                            }
                        }}
                        value={this.state.birthYear}
                        maxLength={4}
                        ref="year"
                    />
                </View>

                <TouchableOpacity style={styles.nextButton} onPress={() => this.onPickDate()}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        )
    }
}


CreateAccountScreen.navigationOptions = {
    headerTitle: 'Create Account'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 185, 64, .15)',
    },
    title: {
        fontSize: 24,
        fontFamily: 'roboto-bold',
        marginTop: 50,
        marginBottom: 30
    },
    userInput: {
        width: '85%',
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
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'roboto-bold'
    },
    datePicker: {
        width: windowWidth * 0.85,
        height: 50,
        paddingHorizontal: 2,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        color: Colors.border
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: windowWidth * 0.85
    },
    dateInput: {
        width: windowWidth * 0.2,
        height: 50,
        paddingHorizontal: 2,
        marginRight: 10,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        color: Colors.border
    },
    dobTitleContainer: {
        marginTop: 20,
        width: windowWidth * 0.85,
        justifyContent: 'flex-start',
    }
});

export default CreateAccountScreen;