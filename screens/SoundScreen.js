import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomButton from '../components/CustomButton';
import HeaderButton from '../components/HeaderButton';
import * as Speech from 'expo-speech';
import Voices from '../constants/Voices';

const SoundScreen = props => {
    const thingToSay = 'Cow';
    const factsToSay = 'Cattle are herbivores that eat vegetation such as grass.';
    const soundsToSay = 'Moooooooo!';

    return (
        <View style={styles.screen}>
            <Image style={styles.animalImg} source={require('./cow.png')} />
            <Text style={styles.facts}>Cattle are herbivores that eat vegetation such as grass.</Text>
            <View style={styles.soundIcons}>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title="Menu" iconName='ios-play' onPress={() => Speech.speak(thingToSay, {
                        language: 'en',
                        pitch: 1,
                        rate: .7,
                        voice: Voices.nicky
                    })}
                    />
                </HeaderButtons>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title="Menu" iconName='ios-text' onPress={() => Speech.speak(factsToSay, {
                        language: 'en',
                        pitch: 1,
                        rate: .7,
                        voice: Voices.nicky
                    })}
                    />
                </HeaderButtons>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title="Menu" iconName='ios-megaphone' onPress={() => Speech.speak(soundsToSay, {
                        language: 'en',
                        pitch: 1,
                        rate: .7,
                        voice: Voices.nicky
                    })}
                    />
                </HeaderButtons>
            </View>




        </View>


    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animalImg: {
        width: 200,
        height: 200,
    },
    facts: {
        width: '70%',
        marginVertical: 15,
    },
    soundIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
        
    }
});


export default SoundScreen;
