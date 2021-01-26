import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { useFocusEffect } from 'react-navigation-hooks'

const MostUsedScreen = () => {
    let savedDictionary = useSelector(num => num.count.sentenceCount);
    const [sortable, setSortable] = useState([]);
    const [dictionary, setDictionary] = useState(savedDictionary);
    let tempNum = 1;

    let sortThis = () => {
        setDictionary(savedDictionary);
        setSortable(Object.entries(dictionary).sort((a, b) => b[1] - a[1]));
    }

    useEffect(() => {
        sortThis();
        console.log(sortable);  //returns sorted array
    }, [savedDictionary, dictionary]);
    
    //useFocusEffect to make up for tabNavigation not updating when page loads
    useFocusEffect(useCallback(() => {
        sortThis();
        // console.log(sortable); 
    }, []));

    return (
        <View style={styles.screen}>
            <Text style={styles.headLine}>Top 10 Most Used Sentences</Text>
            {!sortable.length && <Text style={styles.emptySearch}>No results found.</Text>}
            <View style={styles.listContainer}>
                {sortable.slice(0,10).map(item =>
                    <Text key={item[0]} style={styles.listItems}>{tempNum++}.  {item[0]}</Text>
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
