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




const ProfileScreen = () => {


    const [data, setData] = useState([
        {
            name: "chat",
            count: 0,
            color: "#bf3f57",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "i feel",
            count: 0,
            color: "#a64672",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "about me",
            count: 0,
            color: "#4333a6",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "activities",
            count: 0,
            color: "#5ba666",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Food and Drink",
            count: 0,
            color: "#f2b591",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "numbers",
            count: 0,
            color: "#d9bb84",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "places",
            count: 0,
            color: "#bf7636",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "colors",
            count: 0,
            color: "#a65e44",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "core words",
            count: 0,
            color: "#bf463b",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ]);
    let currentProfile = useSelector(e => e.profile);
    let currentCount = useSelector(e => e.count);


    let increaseCount = () => {
        for (let item in currentCount.wordCount) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === item) {
                    data[i].count = currentCount.wordCount[item];
                }
            }
        }
        let tempData = data;
        setData(tempData);
    }

    useEffect(() => {
        increaseCount();
    }, [data, currentCount]);

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