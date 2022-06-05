import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Switch, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as settingsActions from '../store/actions/settings';
import * as Updates from 'expo-updates';

const SettingsScreen = props => {

    let userSettings = useSelector(state => state.setting);
    // console.log(userSettings.silentMode);
    const [cardSize, setCardSize] = useState(userSettings.cardSize);
    const [speechVoice, setSpeechVoice] = useState(userSettings.voice);
    const [speechPitch, setSpeechPitch] = useState(userSettings.pitch);
    const [speechRate, setSpeechRate] = useState(userSettings.rate);
    const [font, setFont] = useState('Roboto');
    const [silentMode, setSilentMode] = useState(userSettings.silentMode);

    const optionsItemsCardSize = [
        { id: '1', value: 'Small', cat: 'cardSize' },
        { id: '2', value: 'Medium', cat: 'cardSize' },
        { id: '3', value: 'Large', cat: 'cardSize' }
    ]

    const optionsItemsVoice = [
        { id: '1', value: 'Aaron', cat: 'voice' },
        { id: '2', value: 'Fred', cat: 'voice' },
        { id: '3', value: 'Nicky', cat: 'voice' },
        { id: '4', value: 'Samantha', cat: 'voice' },
        { id: '5', value: 'Alex', cat: 'voice' }
    ]

    const optionsItemsPitch = [
        { id: '1', value: '.1', cat: 'pitch' },
        { id: '2', value: '.5', cat: 'pitch' },
        { id: '3', value: '1', cat: 'pitch' },
        { id: '4', value: '1.5', cat: 'pitch' },
        { id: '5', value: '2', cat: 'pitch' }
    ]

    const optionsItemsRate = [
        { id: '1', value: '.1', cat: 'rate' },
        { id: '2', value: '.5', cat: 'rate' },
        { id: '3', value: '1', cat: 'rate' },
        { id: '4', value: '1.2', cat: 'rate' },
        { id: '5', value: '1.5', cat: 'rate' }
    ]

    let data = props.navigation.state.params;
    const dispatch = useDispatch();

    const getSettings = () => {
        if (data.settingType === 'cardSize') {
            setCardSize(data.value);
        } else if (data.settingType === 'voice') {
            setSpeechVoice(data.value);
            console.log(speechVoice);
        } else if (data.settingType === 'pitch') {
            setSpeechPitch(data.value);
        } else if (data.settingType === 'rate') {
            setSpeechRate(data.value);
        } else if (data.settingType === 'silentMode'){
            setSilentMode(data.value);
        }
    }
    const saveSettings = useCallback(async () => {
        if (silentMode !== userSettings.silentMode) {
            console.log(silentMode);
            console.log(userSettings.silentMode);
            Alert.alert(
                "Do you want to restart now?",
                "App needs to restart in order for changes to be applied.",
                [
                    {
                        text: "Yes",
                        onPress: () => {
                            dispatch(settingsActions.updateSettings(cardSize, speechVoice, speechPitch, speechRate, silentMode));
                            Updates.reloadAsync();
                            console.log(userSettings.silentMode)
                            console.log(silentMode)
                        }
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    }
                ],
                { cancelable: false }
            );
        } else {
            dispatch(settingsActions.updateSettings(cardSize, speechVoice, speechPitch, speechRate, silentMode));
            Alert.alert("Settings has been saved!");
            console.log(userSettings)
            props.navigation.navigate({ routeName: "SpeechMenu" });
        }

    }, [speechVoice, cardSize, speechPitch, speechRate, silentMode]);

    useEffect(() => {
        if (data) {
            getSettings();
        }
        console.log("This is silentMode state:", silentMode)
        console.log("This is voice:", speechVoice)
    }, [getSettings]);

    useEffect(() => {
        props.navigation.setParams({ Save: saveSettings });
    }, [saveSettings])

    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.label}>VIEWING SIZE</Text>
            <View style={styles.settingsContainer}>
                <TouchableHighlight
                    activeOpacity={0.9}
                    underlayColor={"#e5e5ea"}
                    onPress={() => {
                        props.navigation.navigate('Options', optionsItemsCardSize)
                    }}
                >
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>Card Size</Text>
                        <Text style={styles.item}>{cardSize} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                    </View>
                </TouchableHighlight>
            </View>

            <Text style={styles.label}>SPEECH</Text>
            <View style={styles.settingsContainer}>
                <TouchableHighlight
                    activeOpacity={0.9}
                    underlayColor={"#e5e5ea"}
                    onPress={() => {
                        props.navigation.navigate('Options', optionsItemsVoice)
                    }}
                >
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>Voice</Text>
                        <Text style={styles.item}>{speechVoice} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.9}
                    underlayColor={"#e5e5ea"}
                    onPress={() => {
                        props.navigation.navigate('Options', optionsItemsPitch)
                    }}
                >
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>Pitch</Text>
                        <Text style={styles.item}>{speechPitch} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={0.9}
                    underlayColor={"#e5e5ea"}
                    onPress={() => {
                        props.navigation.navigate('Options', optionsItemsRate)
                    }}
                >
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>Rate</Text>
                        <Text style={styles.item}>{speechRate} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                    </View>
                </TouchableHighlight>
            </View>

            <Text style={styles.label}>FONT PREFERENCE</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Font</Text>
                    <Text style={styles.item}>{font} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
                </View>
            </View>

            {/* <Text style={styles.label}>LOGIN</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Keep User Logged In</Text>
                    <Switch
                        trackColor={{ true: Colors.sesameGreen }}
                        value={login}
                        onValueChange={() => setLogin(!login)}
                    />
                </View>
            </View> */}

            <Text style={styles.label}>SILENT MODE</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Speech Heard in Silent Mode</Text>
                    <Switch
                        trackColor={{ true: Colors.sesameGreen }}
                        value={silentMode}
                        onValueChange={() => setSilentMode(!silentMode)}
                    />
                </View>
            </View>

            {/* <Text style={styles.label}>BACKUP</Text>
            <View style={styles.settingsContainer}>
                <View style={styles.itemContainer}>
                    <Text style={styles.item}>Backup User Words</Text>
                    <Switch
                        trackColor={{ true: Colors.sesameGreen }}
                        value={backup}
                        onValueChange={() => setBackup(!backup)}
                    />
                </View>
            </View> */}
        </ScrollView>
    )
};
SettingsScreen.navigationOptions = navData => {
    const saveFunction = navData.navigation.getParam('Save');

    return {
        headerTitle: 'Settings',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <TouchableOpacity onPress={saveFunction}>
                <Text style={{ marginRight: 10, color: 'white', fontSize: 16 }}>Save</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'rgba(200,200,200,.5)'
    },
    label: {
        fontFamily: 'roboto-bold',
        fontSize: 13,
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
        fontFamily: 'roboto',
        fontSize: 17,
        color: 'rgba(20,20,20,.7)',
        marginHorizontal: 10,
    }
});
export default SettingsScreen;
