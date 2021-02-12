import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import * as Speech from 'expo-speech';
import Voices from '../../constants/Voices';

const windowWidth = Dimensions.get('window').width;

const ImageGalleryScreen = (props) => {
    let userSettings = useSelector(state => state.setting);

    return (
        <View style={styles.screen}>
            <ScrollView >
                <View style={styles.pageGroups}>
                    <TouchableOpacity style={styles.image} onPress={() => {
                    Speech.speak("Meooow", {
                        language: 'en',
                        pitch: userSettings.pitch,
                        rate: userSettings.rate,
                        voice: Voices[userSettings.voice]
                    });
                    props.navigation.navigate({
                        routeName: 'ImageTinder',
                        params: {
                            imageUrl: "https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg"
                        }
                    })
                }}>
                        <Image source={{ uri: props.navigation.state.params.imageUrl }}
                            style={styles.imageSource} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.image}>
                        <Image source={{ uri: props.navigation.state.params.imageUrl }}
                            style={styles.imageSource} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.image}>
                        <Image source={{ uri: props.navigation.state.params.imageUrl }}
                            style={styles.imageSource} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.image}>
                        <Image source={{ uri: props.navigation.state.params.imageUrl }}
                            style={styles.imageSource} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.image}>
                        <Image source={{ uri: props.navigation.state.params.imageUrl }}
                            style={styles.imageSource} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.image}>
                        <Image source={{ uri: props.navigation.state.params.imageUrl }}
                            style={styles.imageSource} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.image}>
                        <Image source={{ uri: props.navigation.state.params.imageUrl }}
                            style={styles.imageSource} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.image}>
                        <Image source={{ uri: props.navigation.state.params.imageUrl }}
                            style={styles.imageSource} />
                    </TouchableOpacity>
                    
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
        alignItems: 'center'
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