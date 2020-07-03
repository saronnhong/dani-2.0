import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const FiltersScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>This is the Filters Screen.</Text>
            <Button title="Go to Main Menu!" 
            onPress={()=>{
                props.navigation.navigate({
                    routeName: 'MainMenu'
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
export default FiltersScreen;
