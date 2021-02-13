import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import * as Speech from 'expo-speech';
import Voices from '../../constants/Voices';

const windowWidth = Dimensions.get('window').width;

const ImageGalleryScreen = (props) => {
    let userSettings = useSelector(state => state.setting);
    const unsplashResults = props.navigation.state.params.results;
    // console.log(unsplashResults[0].urls.regular);

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
                        </TouchableOpacity>
                    )}


                </View>
            </ScrollView>
        </View>
    )
};

ImageGalleryScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Image Gallery',
        headerBackTitle: ' ',
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 185, 64, .3)',
    },
    pageGroups: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    image: {
        margin: 5
    },
    imageSource: {
        width: windowWidth * .4,
        height: windowWidth * .4
    }
});
export default ImageGalleryScreen;