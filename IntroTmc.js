

import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function IntroTmc(){
    const navigation = useNavigation();
    
    return(
        <View style = {styles.container}>
            <View style = {styles.logoContainer}>
                <Image
                source={require("./assets/tmc-logo.jpg")}
                style= {styles.logo}
                />
            </View>

            <Text style={styles.title}>TMC Guide App</Text>

            <Text style = {styles.description}>
                Welcome to the TMC Guide App - your personal companion for navigating 
                the campus. Find classrooms,  departments, events, and student services 
                all in one place, making your school journey easier and more convenient.
            </Text>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Onboarding')}>
            <Text style={styles.buttonText}>Let's Get Started</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0810ebff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    logoContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: "#1e3a8a", // deeper blue border
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        marginBottom: 25,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 6,
    },

    logo : {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    title:{
        fontSize: 28,
        fontWeight: "bold",
        color: "#000000", // darker black
        marginBottom: 12,
    },

    description: {
        fontSize: 16,
        color: "#000000", // darker black for better readability
        textAlign: "center",
        marginHorizontal: 10,
        marginBottom: 24,
    },

    button: {
        backgroundColor: "#facc15",
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonText: {
        color: "#000",
        fontWeight: "600",
        fontSize: 16,
    },
});
