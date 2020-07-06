import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

const SoundButton = props => {
    return (
        <TouchableOpacity key={props.id}>
            <Image style={styles.animalBtn} source={{uri: props.imageUrl}} />
            <Text>{props.name}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    animalBtn: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 5
    }
})


export default SoundButton;