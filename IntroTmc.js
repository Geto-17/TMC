import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function IntroTmc() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0810ebff" />

      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require("./assets/tmc-logo.jpg")}
          style={styles.logo}
        />
      </Animated.View>

      <Text style={styles.title}>TMC Guide App</Text>

      <Text style={styles.description}>
        Welcome to the TMC Guide App - your personal companion for navigating 
        the campus. Find classrooms, departments, events, and student services 
        all in one place, making your school journey easier and more convenient.
      </Text>

      <TouchableOpacity
        style={styles.button}
        accessibilityLabel="Start onboarding"
        accessibilityHint="Navigates to the onboarding screen"
        onPress={() => navigation.navigate("Onboarding")}
      >
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>

    
      <Text style={styles.footerText}>
        Version 1.0.0 • Developed by TMC Dev Team
      </Text>
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
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
    overflow: "hidden",
  },

  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    color: "#fff",
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


  footerText: {
    position: "absolute",
    bottom: 20,
    color: "#ffffffaa",
    fontSize: 12,
    textAlign: "center",
  },
});
