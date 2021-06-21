import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors'
import { IMAGES } from '../../data/profileimg.js';


const windowWidth = Dimensions.get('window').width;

const SelectImageScreen = props => {
    return (
        <ScrollView style={styles.screen}>
            
            <View style={styles.imagesRow}>
                {IMAGES.map(icon =>
                    <TouchableOpacity key={icon.id} onPress={async () => {
                        props.navigation.navigate({
                            routeName: 'EditProfile',
                            params: {
                                image: icon.imageUrl
                            }
                        });
                    }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.profileImage} source={{ uri: icon.imageUrl }} />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    )
};

SelectImageScreen.navigationOptions = () => {
    return {
        headerTitle: 'Select Image',
        headerBackTitle: ' '
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
    },
    imagesRow: {
        marginTop: 10,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    profileImage: {
        width: windowWidth * 0.2,
        height: windowWidth * 0.2,
        backgroundColor: Colors.sesameGreen,
        borderRadius: 0,
        padding: 10,
        margin: 2
    },
    imageContainer: {
        padding: 15,
        margin: 2,
        backgroundColor: Colors.sesameGreen
    }
});
export default SelectImageScreen;