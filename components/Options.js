import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Options = props => {
    const data = props.navigation.state.params;

    return (
        <View style={styles.screen}>
            <View style={styles.settingsContainer}>
                {data.map(item =>
                    <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={()=>{
                        // props.onSelectCard('hello');
                        props.navigation.navigate('Settings', {value: item.value, settingType: item.cat})
                        }}>
                        <Text style={styles.item}>{item.value}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
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
        fontFamily: 'roboto',
        fontSize: 17,
        color: 'rgba(20,20,20,.7)',
        marginHorizontal: 10,


    }
});

export default Options;