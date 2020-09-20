import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const ProfileScreen = props => {

    return (
        <View style={styles.screen}>
            <Image style={styles.cover} source={require('../assets/images/profileimages/coverphoto.jpg')} />
            <Image style={styles.profileimage} source={require('../assets/images/profileimages/butterfly.png')} />
            <Text style={styles.name}>Jeremy</Text>
            <Text style={styles.age}>10 years old</Text>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('EditProfile')
            }}>
                <View style={styles.button}>
                    <Text>Edit Profile</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

ProfileScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Profile',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    cover: {
        width: '100%',
        height: '20%',

    },
    profileimage: {
        width: 100,
        height: 100,
        backgroundColor: Colors.sesameGreen,
        borderRadius: 100,
        padding: 10,
        marginTop: -50,
        borderColor: 'white',
        borderWidth: 3
    },
    name: {
        fontSize: 20,
        fontFamily: 'roboto-bold'
    },
    age: {
        fontSize: 14,
        fontFamily: 'roboto'
    },
    button: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.border,
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: Colors.sesameGreen,
        marginTop: 10,
        fontFamily: 'roboto',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default ProfileScreen;