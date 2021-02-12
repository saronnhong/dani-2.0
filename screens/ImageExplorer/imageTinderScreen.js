import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

import Colors from '../../constants/Colors'

const windowWidth = Dimensions.get('window').width;

const ImageTinderScreen = (props) => {


    return (
        <View style={styles.screen}>
            <Text>Tinder</Text>
            <TouchableOpacity style={styles.image}>
                <Image source={{ uri: props.navigation.state.params.imageUrl }}
                    style={styles.imageSource} />
            </TouchableOpacity>
        </View>
    )
};

ImageTinderScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Image Tinder',
        headerBackTitle: ' ',
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        margin: 5
    },
    imageSource: { 
        width: windowWidth, 
        height: windowWidth
    }
});
export default ImageTinderScreen;