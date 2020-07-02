import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SplashScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>This is the Splash Screen. </Text>
            <Button title="Go to Log In!" 
            onPress={()=>{
                props.navigation.navigate({
                    routeName: 'Login'
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

export default SplashScreen;
