import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const CustomButton = props => {
    return <HeaderButton {...props}
        IconComponent={Ionicons}
        iconSize={35}
        color='white'
        style={{
            borderWidth: 1,
            borderRadius: 40,
            width: 70,
            height: 70,
            backgroundColor: '#1976D2',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,

        }}
    />
}
export default CustomButton;