import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors'
import { IMAGES } from '../../data/profileimg.js';
import * as profileActions from '../../store/actions/profile';


const windowWidth = Dimensions.get('window').width;

const SelectImageScreen = props => {
    const previousPage = props.navigation.state.params.previousPage;

    // const [state, setState] = useState({
    //     name: currentProfile.name,
    //     age: currentProfile.age,
    //     imageUrl: props.navigation.state.params.image,
    //     coverUrl: require('../assets/images/profileimages/coverphoto.jpg')
    // });


    // const dispatch = useDispatch();
    // const saveProfile = useCallback(async () => {
    //     dispatch(profileActions.updateProfile(state.name, state.age, state.imageUrl, state.coverUrl));
    //     props.navigation.navigate({ routeName: "SpeechMenu" });
    // }, [state.name, state.age, state.imageUrl]);


    return (
        <View style={styles.screen}>
            <View style={styles.imagesRow}>
                {IMAGES.map(icon =>
                    <TouchableOpacity key={icon.id} onPress={async () => {
                        // dispatch(profileActions.updateProfile(icon.cat, "33", icon.imageUrl));
                        props.navigation.navigate({
                            routeName: 'EditProfile',
                            // routeName: '',
                            params: {
                                image: icon.imageUrl
                            }
                        });
                    }}>
                        <Image style={styles.profileImage} source={icon.imageUrl} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
};

SelectImageScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Select Image',
        headerBackTitle: ' '
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    imagesRow: {
        marginTop: 10,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center'
        // justifyContent: 'center',
        // height: 100,
    },
    profileImage: {
        width: windowWidth * 0.32,
        height: windowWidth * 0.32,
        backgroundColor: Colors.sesameGreen,
        borderRadius: 0,
        padding: 10,
        margin: 2
        // borderColor: 'white',
        // borderWidth: 3
    }
});
export default SelectImageScreen;