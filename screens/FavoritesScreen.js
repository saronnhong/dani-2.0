import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';

export default class FavoritesScreen extends React.Component {
    speak() {
        var thingToSay = 'And before anyone starts to panic, oh my god he is making videos in place of writing, OF COURSE I am still working on WINDS OF WINTER as well. ';
        Speech.speak(thingToSay);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Press to hear some words" onPress={this.speak} />
            </View>
        );
    }
}

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
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
