import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import * as Speech from 'expo-speech';
import Voices from '../../constants/Voices';
import { Ionicons } from '@expo/vector-icons';

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
                imageUrl: "https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg",
                results: details
            }
        })
    }

    return (
        <View style={styles.screen}>
            <ScrollView >
                <View style={styles.pageGroups}>
                    {unsplashResults.map(item =>
                        <TouchableOpacity key={item.id} style={styles.image} onPress={() => goToTinder(item.description, item)}>
                            <Image source={{ uri: item.urls.small }}
                                style={styles.imageSource} />
                            <TouchableOpacity>
                                {!isFav ? <Ionicons style={styles.favs} name='ios-heart-empty' size={25} color='red' /> : <Ionicons style={styles.favs} name='ios-heart' size={25} color='red' />}
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