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
            name: "Chat",
            category: "chat",
            count: 0,
            color: "#15a0bf",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "I Feel",
            category: "i feel",
            count: 0,
            color: "#f2c849",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "About Me",
            category: "about me",
            count: 0,
            color: "#f28a2e",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Activities",
            category: "activities",
            count: 0,
            color: "#f25922",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Food & Drink",
            category: "food & drink",
            count: 0,
            color: "#bf2c1f",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Numbers",
            category: "numbers",
            count: 0,
            color: "#9966ff",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Places",
            category: "places",
            count: 0,
            color: "#ff99ff",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Colors",
            category: "colors",
            count: 0,
            color: "#9cb961",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Core Words",
            category: "core words",
            count: 0,
            color: "#009933",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        }
    ]);
    let currentProfile = useSelector(e => e.profile);
    let currentCount = useSelector(e => e.count);


    let increaseCount = () => {
        for (let item in currentCount.wordCount) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].category === item) {
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
            <View style={styles.pieChart}>
                <Text style={styles.chartTitle}> User Analytics - Categories</Text>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    chartConfig={chartConfig}
                    accessor={"count"}
                    backgroundColor={"transparent"}
                    paddingLeft={"30"}
                    center={[5, 10]}
                    // absolute
                    avoidFalseZero={true}
                />
            </View>
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
    chartTitle:{
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        fontFamily: 'roboto-bold'
    }
});
export default ProfileScreen;

