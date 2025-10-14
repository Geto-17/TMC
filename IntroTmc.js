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
        backgroundColor: "#233A66",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    logoContainer: {
        width: 130,
        height: 130,
        borderRadius: 65,
        borderWidth: 7,
        borderColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFD691",
        marginBottom: 20,
        overflow: "hidden",
    },

    logo : {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    title:{
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFD691",
        marginBottom: 12,
    },

    description: {
        fontSize: 16,
        color: "#D7D7D7",
        textAlign: "center",
        marginHorizontal: 10,
        marginBottom: 24,
    },

    button: {
        backgroundColor: "#FFD691",
        paddingVertical: 12,
        paddingHorizontal: 28,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonText: {
        color: "#233A66",
        fontWeight: "600",
        fontSize: 16,
    },
});