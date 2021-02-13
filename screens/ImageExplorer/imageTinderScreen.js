import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImageTinderScreen = (props) => {
    const imageDetails = props.navigation.state.params.results;
    const [isFav, setIsFav] = useState(true);


    return (
        <View style={styles.screen}>
            <View style={styles.image}>
                <Image source={{ uri: imageDetails.urls.regular }}
                    style={styles.imageSource} />
                <TouchableOpacity>
                    {isFav ? <Ionicons style={styles.favs} name='ios-heart-empty' size={25} color='red' /> : <Ionicons style={styles.favs} name='ios-heart' size={25} color='red' />}
                </TouchableOpacity>
            </View>
        </View>
    )
};

ImageTinderScreen.navigationOptions = () => {
    return {
        headerTitle: 'Tinder',
        headerBackTitle: ' ',
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 185, 64, .2)'
    },
    image: {
        // marginTop: 1
    },
    imageSource: {
        width: windowWidth,
        height: windowHeight
    },
    favs: {
        position: 'absolute',
        bottom: 120,
        right: 30,
        fontSize: 60
    }
});
export default ImageTinderScreen;