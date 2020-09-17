import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';



const SelectImageScreen = props => {

    const profileImages = [
        {
            id: 1,
            cat: "Butterfly",
            imageUrl: require('../assets/images/profileimages/butterfly.png'),
        },
        {
            id: 2,
            cat: "Castle",
            imageUrl: require('../assets/images/profileimages/castle.png'),
        },
        {
            id: 3,
            cat: "Rainbow",
            imageUrl: require('../assets/images/profileimages/rainbow.png'),
        }, {
            id: 4,
            cat: "Train",
            imageUrl: require('../assets/images/profileimages/train.png'),
        },
        {
            id: 5,
            cat: "Robot",
            imageUrl: require('../assets/images/profileimages/robot.png'),
        },
        {
            id: 6,
            cat: "Soccer",
            imageUrl: require('../assets/images/profileimages/soccer.png'),
        },
        {
            id: 7,
            cat: "Football",
            imageUrl: require('../assets/images/profileimages/football.png'),
        },
        {
            id: 8,
            cat: "Rocket",
            imageUrl: require('../assets/images/profileimages/rocket.png'),
        },
        {
            id: 9,
            cat: "Ladybug",
            imageUrl: require('../assets/images/profileimages/ladybug.png'),
        },
        {
            id: 10,
            cat: "Starfish",
            imageUrl: require('../assets/images/profileimages/starfish.png'),
        },
        {
            id: 11,
            cat: "Sunflower",
            imageUrl: require('../assets/images/profileimages/sunflower.png'),
        },
    ];


    // const coverImages = [
    //     {
    //         id: 1,
    //         cat: "Chat",
    //         imageUrl: require('../../assets/images/speechboard/menu/chat-min.png'),
    //     },
    //     {
    //         id: 2,
    //         cat: "I Feel",
    //         imageUrl: require('../../assets/images/speechboard/menu/feelings-min.png'),
    //     },
    //     {
    //         id: 3,
    //         cat: "About Me",
    //         imageUrl: require('../../assets/images/speechboard/menu/self-min.png'),
    //     }, {
    //         id: 4,
    //         cat: "Activities",
    //         imageUrl: require('../../assets/images/speechboard/menu/activities-min.png'),
    //     }
    // ];

    return (
        <View style={styles.screen}>
            <View style={styles.imagesRow}>
                {profileImages.map(icon =>
                    <View key={icon.id}>
                        <Image style={styles.profileImage} source={icon.imageUrl} />
                    </View>
                )}
            </View>
        </View>
    )
};

SelectImageScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Profile',
        // headerLeft: () => (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <Item title="Menu" iconName='ios-menu' onPress={() => {
        //             navData.navigation.toggleDrawer();
        //         }} />
        //     </HeaderButtons>
        // ),
        // headerRight: () => (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <Item title="Edit" iconName='ios-add' onPress={() => {
        //             navData.navigation.navigate('EditProfile');
        //         }} />
        //     </HeaderButtons>
        // )
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    imagesRow: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        flexWrap: 'wrap',
        // justifyContent: 'center',
        height: 100,
    },
    profileImage: {
        width: 125,
        height: 125,
        backgroundColor: Colors.sesameGreen,
        borderRadius: 0,
        padding: 10,
        borderColor: 'white',
        borderWidth: 3
    }
});
export default SelectImageScreen;