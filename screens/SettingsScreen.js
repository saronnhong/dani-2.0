import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Switch, TouchableHighlight } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const SettingsScreen = props => {
    const [cardSize, setCardSize] = useState('Large');
    const [textSize, setTextSize] = useState('Medium');
    const [speechVoice, setSpeechVoice] = useState('Nicky');
    const [speechPitch, setSpeechPitch] = useState();
    const [speechRate, setSpeechRate] = useState();
    const [font, setFont] = useState('Roboto');
    const [backup, setBackup] = useState(false);
    const [login, setLogin] = useState(true);
    const [silentmode, setSilentmode] = useState(true);

    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.label}>VIEWING SIZE</Text>
            <View style={styles.settingsContainer}>
                <TouchableHighlight
                    activeOpacity={0.9}
                    underlayColor={"#e5e5ea"}
                    onPress={()=>{}}
                >
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>Card </Text>
                        <Text style={styles.item}>{cardSize} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Text</Text>
                    <Text style={styles.item}>{textSize} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
            </View>


            <Text style={styles.label}>SPEECH</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Voice</Text>
                    <Text style={styles.item}>{speechVoice} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Pitch</Text>
                    <Text style={styles.item}>{speechPitch} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Rate</Text>
                    <Text style={styles.item}>{speechRate} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
            </View>

            <Text style={styles.label}>FONT PREFERENCE</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Font</Text>
                    <Text style={styles.item}>{font} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
            </View>

            <Text style={styles.label}>LOGIN</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Keep User Logged In</Text>
                    <Switch
                        trackColor={{ true: Colors.sesameGreen }}
                        value={login}
                        onValueChange={() => setLogin(!login)}
                    />
                </View>
            </View>

            <Text style={styles.label}>SILENT MODE</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Speech Heard in Silent Mode</Text>
                    <Switch
                        trackColor={{ true: Colors.sesameGreen }}
                        value={silentmode}
                        onValueChange={() => setSilentMode(!silentmode)}
                    />
                </View>
            </View>


            <Text style={styles.label}>BACKUP</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Backup User Words</Text>
                    <Switch
                        trackColor={{ true: Colors.sesameGreen }}
                        value={backup}
                        onValueChange={() => setBackup(!backup)}
                    />
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
