import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ImageTinderScreen = (props) => {
    const imageDetails = props.navigation.state.params.results;
    console.log(imageDetails.color)

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.image}>
                <Image source={{ uri: imageDetails.urls.regular }}
                    style={styles.imageSource} />
            </TouchableOpacity>
            <Text>{imageDetails.description}</Text>
        </View>
    )
};

ImageTinderScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Tinder',
        headerBackTitle: ' ',
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 185, 64, .3)'
    },
    image: {
        marginTop: 10,
        marginBottom: 20
    },
    imageSource: {
        width: windowWidth,
        height: windowWidth,
    }
});
export default ImageTinderScreen;