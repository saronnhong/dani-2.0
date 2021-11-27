import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { PieChart } from "react-native-chart-kit";

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

const ProfileScreen = (props) => {
    let currentProfile = useSelector(e => e.profile);
    let currentCount = useSelector(e => e.count);
    const [hideChart, sethideChart] = useState(false);


    const [data, setData] = useState([
        {
            name: "Chat",
            category: "chat",
            count: currentCount.wordCount["chat"] ? currentCount.wordCount["chat"] : 0,
            color: "#15a0bf",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "I Feel",
            category: "i feel",
            count: currentCount.wordCount["i feel"] ? currentCount.wordCount["i feel"] : 0,
            color: "#f2c849",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "About Me",
            category: "about me",
            count: currentCount.wordCount["about me"] ? currentCount.wordCount["about me"] : 0,
            color: "#f28a2e",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Activities",
            category: "activities",
            count: currentCount.wordCount["activites"] ? currentCount.wordCount["activites"] : 0,
            color: "#f25922",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Food & Drink",
            category: "food & drink",
            count: currentCount.wordCount["food & drink"] ? currentCount.wordCount["food & drink"] : 0,
            color: "#bf2c1f",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Numbers",
            category: "numbers",
            count: currentCount.wordCount["numbers"] ? currentCount.wordCount["numbers"] : 0,
            // color: "#9966ff",
            color: "#8c72a6",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Places",
            category: "places",
            count: currentCount.wordCount["places"] ? currentCount.wordCount["places"] : 0,
            // color: "#ff99ff",
            color: '#f25774',
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Colors",
            category: "colors",
            count: currentCount.wordCount["colors"] ? currentCount.wordCount["colors"] : 0,
            // color: "#9cb961",
            color: "#87dda0",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Core Words",
            category: "core words",
            count: currentCount.wordCount["core words"] ? currentCount.wordCount["core words"] : 0,
            // color: "#009933",
            color: "#367368",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        }
    ]);


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
        if (Object.keys(currentCount.wordCount).length === 0) {
            sethideChart(true);
        } else {
            sethideChart(false);
        }
    }, [data, currentCount]);

    return (
        <View style={styles.screen}>
            <Image style={styles.cover} source={require('../../assets/images/profileimages/coverphoto.jpg')} />
            <View style={styles.imageContainer}>
                <Image style={styles.profileimage} source={{ uri: currentProfile.imageUrl }} />
            </View>
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
            {hideChart ? null :
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
            }
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
        alignItems: 'center'
    },
    cover: {
        width: '100%',
        height: '20%',
    },
    imageContainer: {
        padding: 10,
        backgroundColor: Colors.sesameGreen,
    },
    profileimage: {
        marginTop: -70,
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        padding: 20,
        margin: 2
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
    chartTitle: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        fontFamily: 'roboto-bold'
    }
});
export default ProfileScreen;

