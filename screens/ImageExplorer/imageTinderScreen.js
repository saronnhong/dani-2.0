import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImageTinderScreen = (props) => {
    const imageDetails = props.navigation.state.params.results;
    const [isFav, setIsFav] = useState(false);
    const [favHash, setFavHash] = useState({})
   
    let makeFav = (id) => {
        if (!favHash[id]) {
            let tempHash = favHash;
            tempHash[id] = 1;
            setFavHash(tempHash);
            setIsFav(!isFav);
        }else{
            let tempHash = favHash;
            delete tempHash[id];
            setFavHash(tempHash);
            setIsFav(!isFav)
        }
    }
    

    return (
        <View style={styles.screen}>
            <View style={styles.image}>
                <Image source={{ uri: imageDetails.urls.regular }}
                    style={imageDetails.width > imageDetails.height ? styles.imageSourceLandscape : styles.imageSourcePortrait} />
                <TouchableOpacity onPress={() => makeFav(imageDetails.id)} hitSlop={{top: 200, bottom: 200, left: 200, right: 200}}>
                    {isFav ? <Ionicons style={imageDetails.width > imageDetails.height ? styles.favsLandscape : styles.favsPortrait} name='ios-heart' color='red' /> : <Ionicons style={imageDetails.width > imageDetails.height ? styles.favsLandscape : styles.favsPortrait} name='ios-heart-empty' color='red' />}
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
    imageSourcePortrait: {
        width: windowWidth,
        height: windowHeight - 100
    },
    imageSourceLandscape: {
        width: windowWidth,
        height: windowWidth
    },
    favsPortrait: {
        position: 'absolute',
        bottom: 20,
        right: 15,
        fontSize: 60
    },
    favsLandscape: {
        position: 'absolute',
        bottom: 0,
        right: 15,
        fontSize: 60
    }
});
export default ImageTinderScreen;