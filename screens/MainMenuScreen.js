import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MainMenuScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>This is the Main Menu Screen.</Text>
            <Button title="Go to Sounds Menu!" 
            onPress={()=>{
                props.navigation.navigate({
                    routeName: 'SoundMenu'
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
export default MainMenuScreen;
