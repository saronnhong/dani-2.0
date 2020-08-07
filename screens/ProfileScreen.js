import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const ProfileScreen = props => {
    let profileState = useSelector(state => state.profile);
    console.log(profileState)

    return (
        <View style={styles.screen}>
            {/* <Text>{profileState.name}</Text> */}
            <Button title="Go to Main Menu!" 
            onPress={()=>{
                props.navigation.navigate({
                    routeName: 'EditProfile'
                })
            }}/>
        </View>
    )
};

ProfileScreen.navigationOptions = navData => {
    const saveFunction = navData.navigation.getParam('Save');

    return {
        headerTitle: 'Profile',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Edit" iconName='ios-add' onPress={() => {
                    navData.navigation.navigate('EditProfile');
                }} />
            </HeaderButtons>
        )
    }
}


const styles= StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ProfileScreen;