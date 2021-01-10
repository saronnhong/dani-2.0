import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get('window').width
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

let dataArray = [1, 1, 1, 1, 1, 1, 1, 1, 1];

const data = [
    {
        name: "Chat",
        count: dataArray[0],
        color: Colors.primaryColor,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "I Feel",
        count: dataArray[1],
        color: Colors.accentColor,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "About Me",
        count: dataArray[2],
        color: Colors.sesameGreen,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Activities",
        count: dataArray[3],
        color: Colors.sesameOrange,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Food and Drink",
        count: dataArray[4],
        color: Colors.sesameYellow,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Numbers",
        count: dataArray[5],
        color: Colors.sesameRed,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Places",
        count: dataArray[6],
        color: Colors.sesameRedOrange,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Colors",
        count: dataArray[7],
        color: Colors.sesamePurple,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "core words",
        count: dataArray[8],
        color: Colors.sesameGold,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];


const ProfileScreen = props => {
    let currentProfile = useSelector(state => state.profile);
    let currentCount = useSelector(state => state.count);
    console.log(currentCount);
    console.log(currentProfile);


    let increaseCount = () => {
        for (let item in currentCount) {
            for(let i = 0; i<dataArray.length; i++) {
                // if(item === category.name){
                // }
            console.log("this is it")
            console.log(item["core words"])
            // console.log(category[item.name])
            }
        }
    }

    useEffect(() => {
       increaseCount()
       console.log("hi buddy")
    }, []);

    return (
        <View style={styles.screen}>
            <Image style={styles.cover} source={require('../../assets/images/profileimages/coverphoto.jpg')} />
            <Image style={styles.profileimage} source={currentProfile.imageUrl} />
            <Text style={styles.name}>{currentProfile.name}</Text>
            <Text style={styles.age}>Age: {currentProfile.age}</Text>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate({
                    routeName: 'EditProfile',
                    params: {
                        image: currentProfile.imageUrl
                    }
                })
            }}>
                <View style={styles.button}>
                    <Text>Edit Profile</Text>
                </View>
            </TouchableOpacity>
            <PieChart
                data={data}
                width={screenWidth}
                height={250}
                chartConfig={chartConfig}
                accessor={"count"}
                backgroundColor={"transparent"}
                paddingLeft={"50"}
                center={[5, 10]}
                absolute
            />
        </View>
    )
};

ProfileScreen.navigationOptions = navData => {

    return {
        headerTitle: 'Profile',
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
        // justifyContent: 'center',
        alignItems: 'center'
    },
    cover: {
        width: '100%',
        height: '20%',

    },
    profileimage: {
        width: 100,
        height: 100,
        backgroundColor: Colors.sesameGreen,
        borderRadius: 100,
        padding: 10,
        marginTop: -50,
        borderColor: 'white',
        borderWidth: 3
    },
    name: {
        fontSize: 20,
        fontFamily: 'roboto-bold'
    },
    age: {
        fontSize: 14,
        fontFamily: 'roboto'
    },
    button: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.border,
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: Colors.sesameGreen,
        marginTop: 10,
        fontFamily: 'roboto',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default ProfileScreen;