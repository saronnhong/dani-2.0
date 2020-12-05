import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../constants/Colors'
import { IMAGES } from '../../data/profileimg.js';

const windowWidth = Dimensions.get('window').width;

const SelectImageScreen = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.imagesRow}>
                {IMAGES.map(icon =>
                    <TouchableOpacity key={icon.id} onPress={() => {
                        props.navigation.navigate({
                            routeName: 'SelectProfileImageScreen',
                            params: {
                                image: icon.imageUrl
                            }
                        });
                    }}>
                        <Image style={styles.profileImage} source={icon.imageUrl} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
};

SelectImageScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Select Image',
        headerBackTitle: ' '
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
    imagesRow: {
        marginTop: 10,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    profileImage: {
        width: windowWidth * 0.32,
        height: windowWidth * 0.32,
        backgroundColor: Colors.sesameGreen,
        borderRadius: 0,
        padding: 10,
        margin: 2
    }
});
export default SelectImageScreen;