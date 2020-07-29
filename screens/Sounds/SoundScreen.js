import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomButton from '../../components/CustomButton';
import * as Speech from 'expo-speech';
import Voices from '../../constants/Voices';
import { SOUNDS } from '../../data/animals';
import HeaderButton from '../../components/HeaderButton';

const SoundScreen = props => {
    const soundId = props.navigation.state.params.id;
    const selectedSound = SOUNDS.find(sound => sound.id === soundId);

    const nameToSay = selectedSound.nameToSay;
    const factsToSay = selectedSound.factsToSay;
    const soundsToSay = selectedSound.soundsToSay;

    return (
        <View style={styles.screen}>
            <Image style={styles.animalImg} source={{uri: selectedSound.imageUrl}} />
            <Text style={styles.facts}>{selectedSound.factsToSay}</Text>
            <View style={styles.soundIcons}>
                <HeaderButtons HeaderButtonComponent={CustomButton}>
                    <Item title="Menu" iconName='ios-paw' onPress={() => Speech.speak(nameToSay, {
                        language: 'en',
                        pitch: 1,
                        rate: .8,
                        voice: Voices.nicky
                    })}
                    />
                </HeaderButtons>
                <HeaderButtons HeaderButtonComponent={CustomButton}>
                    <Item title="Menu" iconName='ios-text' onPress={() => Speech.speak(factsToSay, {
                        language: 'en',
                        pitch: 1,
                        rate: .8,
                        voice: Voices.nicky
                    })}
                    />
                </HeaderButtons>
                <HeaderButtons HeaderButtonComponent={CustomButton}>
                    <Item title="Menu" iconName='ios-megaphone' onPress={() => Speech.speak(soundsToSay, {
                        language: 'en',
                        pitch: 1,
                        rate: .8,
                        voice: Voices.nicky
                    })}
                    />
                </HeaderButtons>
            </View>
        </View>
    )
};
SoundScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Animal Sounds'
        
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#66bb6a'
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
