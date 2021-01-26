import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { WORDS } from '../../data/words';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import * as wordActions from '../../store/actions/sentenceBar'

const MostUsedScreen = props => {
    let savedDictionary = useSelector(num => num.count.sentenceCount);
    const [sortable, setSortable] = useState([])

    useEffect(() => {
        setSortable(Object.entries(savedDictionary).sort((a, b) => b[1] - a[1]));
        console.log(sortable[0]);  //returns sorted array
    }, [savedDictionary]);

    return (
        <View style={styles.screen}>
            {sortable.map(item =>
                <Text key={item[0]} style={styles.listItems}>{item[0]}</Text>
            )}
        </View>
    )
};

MostUsedScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Most Used',
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 185, 64, .2)',
    },
    listItems: {
        fontSize: 24
    }
});
export default MostUsedScreen;
