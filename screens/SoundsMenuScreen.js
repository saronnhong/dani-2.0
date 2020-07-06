import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { SOUNDS } from '../data/animals';
import SoundButton from '../components/SoundButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const SoundsMenuScreen = props => {

    return (
        <View style={styles.screen}>
            <Text style={styles.categoryTitle}>Animals</Text>
            <View style={styles.animalRow}>
                {SOUNDS.map(animal =>
                    <TouchableOpacity key={animal.id} onPress={() => {
                        props.navigation.navigate({
                            routeName: 'SoundScreen',
                            params: {
                                id: animal.id
                            }
                        });
                    }} >
                        <Image style={styles.animalBtn} source={{ uri: animal.imageUrl }} />
                        <View style={styles.animalName}>
                            <Text >{animal.name}</Text>
                        </View>

                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
};

SoundsMenuScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Sounds Menu',
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
        // justifyContent: 'center',
        alignItems: 'center'
    },
    animalBtn: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 5
    },
    animalRow: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    categoryTitle: {
        fontSize: 20,
        fontFamily: "open-sans-bold",
        marginVertical: 15

    },
    animalName: {
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 3

    }
});
export default SoundsMenuScreen;
