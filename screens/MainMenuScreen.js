import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

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

MainMenuScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Main Menu',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
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
export default MainMenuScreen;
