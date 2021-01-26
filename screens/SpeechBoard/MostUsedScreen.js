import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { WORDS } from '../../data/words';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_CONSTANT } from 'expo-av/build/Audio';

const MostUsedScreen = () => {
    let savedDictionary = useSelector(num => num.count.sentenceCount);
    const [sortable, setSortable] = useState([]);
    const [dictionary, setDictionary] = useState({});

    let sortThis = () => {
        setDictionary(savedDictionary);
        setSortable(Object.entries(dictionary).sort((a, b) => b[1] - a[1]));
    }

    useEffect(() => {
        sortThis();
        console.log(sortable[0]);  //returns sorted array
        console.log(sortable.length + "length of dic")
    }, [savedDictionary, dictionary]);
    let tempNum = 1;
    return (
        <View style={styles.screen}>
            <Text style={styles.headLine}>Top 10 Most Used Sentences</Text>
            {!sortable.length && <Text style={styles.emptySearch}>No results found.</Text>}
            <View style={styles.listContainer}>
                {sortable.map(item =>
                    <Text key={item[0]} style={styles.listItems}>{tempNum++}. {item[0]}</Text>
                )}
            </View>


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
    headLine: {
        fontSize: 24,
        fontFamily: 'roboto-bold',
        marginVertical: 25
    },
    listContainer: {
        alignItems: 'flex-start'
    },
    listItems: {
        fontSize: 20,
        color: Colors.border
    },
    emptySearch: {
        marginTop: 100
    }
});
export default MostUsedScreen;
