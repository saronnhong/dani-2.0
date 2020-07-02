import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SoundsMenuScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>This is the Sound Menu Screen.</Text>
        </View>
    )
};

const styles= StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default SoundsMenuScreen;
