import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';

const FavoritesScreen = () => {
    const thingToSay = 'And before anyone starts to panic, oh my god he is making videos in place of writing, OF COURSE I am still working on WINDS OF WINTER as well. ';

    return (
        <View style={styles.container}>
            <Button 
            title="Press to hear some words" 
            onPress={() => Speech.speak(thingToSay, {
                language: 'en',
                pitch: 1,
                rate: 1,
                voice: Voices.nicky
            })} />
        </View>
    )
};

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Favorites Screen',
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
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default FavoritesScreen;