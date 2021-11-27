import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import * as Speech from 'expo-speech';
import Voices from '../../constants/Voices';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import FavIcon from '../../components/FavoriteIcon';

const windowWidth = Dimensions.get('window').width;

const ImageGalleryScreen = (props) => {
    let userSettings = useSelector(state => state.setting);
    const unsplashResults = props.navigation.state.params.results;

    const [isFav, setIsFav] = useState(false);

    let goToTinder = (category, details) => {
        Speech.speak(category, {
            language: 'en',
            pitch: userSettings.pitch,
            rate: userSettings.rate,
            voice: Voices[userSettings.voice]
        });
        props.navigation.navigate({
            routeName: 'ImageTinder',
            params: {
                results: details
            }
        })
    }
    const [favHash, setFavHash] = useState({})
    let makeFav = (id) => {
        if (!favHash[id]) {
            let tempHash = favHash;
            tempHash[id] = 1;
            setFavHash(tempHash);
            console.log(favHash);
            setIsFav(!isFav);
        } else {
            let tempHash = favHash;
            delete tempHash[id];
            setFavHash(tempHash);
            console.log(favHash);
            setIsFav(!isFav)
        }

    }

    return (
        <View style={styles.screen}>
            <ScrollView >
                <View style={styles.pageGroups}>
                    {unsplashResults.map(item =>
                        <TouchableOpacity key={item.id} style={styles.image} onPress={() => goToTinder(item.description, item)}>
                            <Image source={{ uri: item.urls.small }}
                                style={styles.imageSource} />
                            <TouchableOpacity style={styles.favs} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => makeFav(item.id)}>
                                {favHash[item.id] ?
                                    <FontAwesome name="heart" style={styles.favs} size={25} color='red' />
                                    // <Ionicons style={styles.favs} name='ios-heart' size={25} color='red' /> 
                                    :
                                    <FontAwesome name="heart-o" style={styles.favs} size={25} color='red' />
                                    // <Ionicons style={styles.favs} name='ios-heart-empty' size={25} color='red' />
                                }
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    )
};

ImageGalleryScreen.navigationOptions = () => {
    return {
        headerTitle: 'Image Gallery',
        headerBackTitle: ' ',
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    pageGroups: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1
    },
    image: {
        margin: 1
    },
    imageSource: {
        width: windowWidth * .49,
        height: windowWidth * .49
    },
    favs: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        fontSize: 30
    }
});
export default ImageGalleryScreen;