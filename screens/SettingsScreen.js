import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const SettingsScreen = props => {
    const [login, setLogin]= useState(true);
    const [backup, setBackup]= useState(true);
    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.label}>VIEWING SIZE</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Card </Text>
                    <Text style={styles.item}>Medium <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Text</Text>
                    <Text style={styles.item}>Medium <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
            </View>


            <Text style={styles.label}>SPEECH</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Voice</Text>
                    <Text style={styles.item}>Nicky <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Pitch</Text>
                    <Text style={styles.item}>High <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Rate</Text>
                    <Text style={styles.item}>Fast <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
            </View>

            <Text style={styles.label}>FONT PREFERENCE</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Font</Text>
                    <Text style={styles.item}>Open Sans <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
            </View>

            <Text style={styles.label}>BACKUP</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Backup User Words</Text>
                    <Switch
                        trackColor={{ true: Colors.sesameGreen }}
                        value={backup}
                        onValueChange={()=> setBackup(!backup)}
                    />
                    {/* <Text style={styles.item}>Yes <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text> */}
                </View>
            </View>

            <Text style={styles.label}>LOGIN</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Keep User Logged In</Text>
                    <Switch
                        trackColor={{ true: Colors.sesameGreen }}
                        value={login}
                        onValueChange={()=> setLogin(!login)}
                    />
                    {/* <Text style={styles.item}>No <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text> */}
                </View>
            </View>


        </ScrollView>
    )
};
SettingsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Settings',
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
    screen: {
        flex: 1,
        backgroundColor: 'rgba(200,200,200,.5)'
    },
    label: {
        fontFamily: 'open-sans-bold',
        fontSize: 12,
        color: 'rgba(20,20,20,.35)',
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 20
    },
    settingsContainer: {
        backgroundColor: 'rgb(250,250,250)',

    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(20,20,20,.2)',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        fontFamily: 'open-sans',
        fontSize: 17,
        color: 'rgba(20,20,20,.7)',
        marginHorizontal: 10,


    }
});
export default SettingsScreen;
