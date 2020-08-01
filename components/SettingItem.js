import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const optionsItems = [
    { id: '1', value: 'Small' },
    { id: '2', value: 'Medium' },
    { id: '3', value: 'Large' }
]

const SettingItem = props => {
    // const data = props.navigation.state.params;

    return (
        <TouchableHighlight
            activeOpacity={0.9}
            underlayColor={"#e5e5ea"}
            onPress={() => {
                props.navigation.navigate('Options', optionsItems)
            }}
            
        >
            <View style={styles.itemContainer}>
                <Text style={styles.item}>{props.title} </Text>
                <Text style={styles.item}>{props.value} <Ionicons name='ios-arrow-forward' size={18} color='grey' /></Text>
            </View>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'rgba(200,200,200,.6)',



    },
    settingsContainer: {
        backgroundColor: 'rgb(250,250,250)',
        marginTop: 30
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(20,20,20,.2)',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    item: {
        fontFamily: 'open-sans',
        fontSize: 17,
        color: 'rgba(20,20,20,.7)',
        marginHorizontal: 10,


    }
});

export default SettingItem;