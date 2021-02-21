import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import * as Speech from 'expo-speech';
import Voices from '../../constants/Voices';
import Colors from '../../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import API_Keys from '../../api_key'

const windowWidth = Dimensions.get('window').width;
const unsplashAPI = API_Keys.unsplash_api;

const ImageExplorerScreen = (props) => {
    let imageDataSet = [
        {
            id: 1,
            category: "Cat",
            default_image: "https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg"
        },
        {
            id: 2,
            category: "Dog",
            default_image: "http://p.favim.com/orig/2018/07/31/pomerian-pet-cute-puppy-Favim.com-6086020.jpg"
        },
        {
            id: 3,
            category: "Bird",
            default_image: "https://ca.audubon.org/sites/default/files/blog/wp-content/uploads/2012/10/Western-Snowy-Plover-je-lg.jpg"
        },
        {
            id: 4,
            category: "Fruits",
            default_image: "https://images.unsplash.com/photo-1577554105754-602c7bc6adaa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
        },
        {
            id: 5,
            category: "Dessert",
            default_image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
        },
        {
            id: 6,
            category: "Ice Cream",
            default_image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=668&q=80"
        },
        {
            id: 7,
            category: "Beach",
            default_image: "https://images.unsplash.com/photo-1538964173425-93884d739596?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        },
        {
            id: 8,
            category: "Fish",
            default_image: "https://images.unsplash.com/photo-1514855333255-65e03dd92cdc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1703&q=80"
        },
        {
            id: 9,
            category: "Space",
            default_image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80"
        },
        {
            id: 10,
            category: "Wonders of the World",
            default_image: "https://images.unsplash.com/photo-1609949165382-2e442783c8d5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=664&q=80"
        },
        
    ]
    let userSettings = useSelector(state => state.setting);

    let getUnsplashResults = async (keyword) => {
        let randomPage = Math.floor(Math.random()*20);
        let response = await fetch(`https://api.unsplash.com/search/photos?page=${randomPage}&query=${keyword}&client_id=${unsplashAPI}`);
        let json = await response.json();
        return json.results;
    }

    let goToGallery = async (category) => {
        let results = await getUnsplashResults(category);
        Speech.speak(category, {
            language: 'en',
            pitch: userSettings.pitch,
            rate: userSettings.rate,
            voice: Voices[userSettings.voice]
        });
        props.navigation.navigate({
            routeName: 'ImageGallery',
            params: {
                results: results
            }
        })
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                {imageDataSet.map(item =>
                    <TouchableOpacity key={item.id} style={styles.imageGroups} onPress={() => goToGallery(item.category)}>
                        <Image source={{ uri: item.default_image }}
                            style={{ width: 150, height: 150 }} />
                        <View style={styles.textGroups}>
                            <Text>{item.category}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
};

ImageExplorerScreen.navigationOptions = () => {

    return {
        headerTitle: 'Image Explorer',
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
        alignItems: 'center'
    },
    imageGroups: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(33,33,33,.66)',
        width: windowWidth * 0.99,
        margin: 1,
    },
    textGroups: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'whitesmoke'
    }
});
export default ImageExplorerScreen;