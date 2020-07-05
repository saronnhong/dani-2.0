import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SoundsMenuScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>This is the Sound Menu Screen.</Text>
            <Button title="Go to Sounds Screen!" 
            onPress={()=>{
                props.navigation.navigate({
                    routeName: 'SoundScreen'
                })
            }}/>
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
