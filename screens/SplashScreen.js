import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SplashScreen = props => {
    return (
        <View>
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

const styles= StyleSheet.create({});

export default SplashScreen;
