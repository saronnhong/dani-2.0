import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Switch, TouchableHighlight, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as settingsActions from '../store/actions/settings';

const SettingsScreen = props => {
    const [cardSize, setCardSize] = useState('Large');
    const [speechVoice, setSpeechVoice] = useState('Nicky');
    const [speechPitch, setSpeechPitch] = useState('1');
    const [speechRate, setSpeechRate] = useState('1');
    const [font, setFont] = useState('Roboto');
    const [backup, setBackup] = useState(false);
    const [login, setLogin] = useState(true);
    const [silentMode, setSilentMode] = useState(true);

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

    let data1 = props.navigation.state.params;
    const dispatch = useDispatch();

    let userSettings = useSelector(state => state.setting.userSetting);
    console.log(userSettings);




    const getSettings = () => {
        let data = props.navigation.state.params;
        console.log(data);
        if (data.settingType === 'cardSize') {
            setCardSize(data.value);
            // dispatch(settingsActions.updateSettings(cardSize, speechVoice, speechPitch, speechRate));
        } else if (data.settingType === 'voice') {
            setSpeechVoice(data.value);
        } else if (data.settingType === 'pitch') {
            setSpeechPitch(data.value);
        } else if (data.settingType === 'rate') {
            setSpeechRate(data.value);
        }
        console.log('no match');

        // dispatch(settingsActions.updateSettings(cardSize, speechVoice, speechPitch, speechRate));
    }
    alertFunc = () => {
        dispatch(settingsActions.updateSettings(cardSize, speechVoice, speechPitch, speechRate));
        Alert.alert("settings has been saved!")
    }


    useEffect(() => {
        if (data1) {
            getSettings();
        }
    }, [getSettings]);


    return (
        <ScrollView style={styles.screen}>
            <Button title='save' onPress={()=> alertFunc()}/>
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
                        value={silentMode}
                        onValueChange={() => setSilentMode(!silentMode)}
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
