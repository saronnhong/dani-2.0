import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import * as Speech from 'expo-speech';
import Voices from '../../constants/Voices';
import Colors from '../../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

const windowWidth = Dimensions.get('window').width;

const ImageExplorerScreen = (props) => {
    let userSettings = useSelector(state => state.setting);

    return (
        <View style={styles.screen}>
            <ScrollView>
                <TouchableOpacity style={styles.imageGroups} onPress={() => {
                    Speech.speak("Kitty Cat", {
                        language: 'en',
                        pitch: userSettings.pitch,
                        rate: userSettings.rate,
                        voice: Voices[userSettings.voice]
                    });
                    props.navigation.navigate({
                        routeName: 'ImageGallery',
                        params: {
                            imageUrl: "https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg"
                        }
                    })
                }}>
                    <Image source={{ uri: "https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg" }}
                        style={{ width: 150, height: 150 }} />
                    <View style={styles.textGroups}>
                        <Text>Kitty</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageGroups}>
                    <Image source={{ uri: "http://p.favim.com/orig/2018/07/31/pomerian-pet-cute-puppy-Favim.com-6086020.jpg" }}
                        style={{ width: 150, height: 150 }} />
                    <View style={styles.textGroups}>
                        <Text>Puppy</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageGroups}>
                    <Image source={{ uri: "https://ca.audubon.org/sites/default/files/blog/wp-content/uploads/2012/10/Western-Snowy-Plover-je-lg.jpg" }}
                        style={{ width: 150, height: 150 }} />
                    <View style={styles.textGroups}>
                        <Text>Baby Bird</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageGroups}>
                    <Image source={{ uri: "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F05330d0c-6104-11e8-859e-536709dc09ad.jpg?crop=2230%2C1254%2C1%2C185&resize=1180" }}
                        style={{ width: 150, height: 150 }} />
                    <View style={styles.textGroups}>
                        <Text>Panda</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

ImageExplorerScreen.navigationOptions = navData => {

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
        borderColor: Colors.border,
        width: windowWidth * 0.9,
        margin: 10
    },
    textGroups: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default ImageExplorerScreen;