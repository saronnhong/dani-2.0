import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const ProfileScreen = props => {
    let profileState = useSelector(state => state.profile.profileInfo);
    const [pickedImage, setPickedImage] = useState(profileState.imageUrl);
    console.log(profileState);

    useEffect(() => {
        setPickedImage(profileState.imageUrl);
        console.log("hello")
    }, [setPickedImage, profileState])

    return (
        <View style={styles.screen}>
            <Text>{profileState.name}</Text>
            <Text>{profileState.age}</Text>
            <Text>{profileState.imageUrl}</Text>
            <TouchableOpacity style={styles.imagePreview} >
                {!pickedImage && <Image style={{width: 300, height: 200}} source={{ uri: profileState.imageUrl }} />}
                {/* <Image style={{width: 300, height: 200}} source={{uri: "https://pbs.twimg.com/media/D21KsLPUwAAe2aE.png"}} /> */}
            </TouchableOpacity>

            {/* <Button title="Edit Profile"
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'EditProfile'
                    })
                }} /> */}
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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Edit" iconName='ios-add' onPress={() => {
                    navData.navigation.navigate('EditProfile');
                }} />
            </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
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
});
export default ProfileScreen;