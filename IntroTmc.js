import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function IntroTmc() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0810ebff" />

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={require("./assets/tmc-logo.jpg")} style={styles.logo} />
      </View>

      {/* Title and Description */}
      <Text style={styles.title}>TMC Guide App</Text>
      <Text style={styles.description}>
        Welcome to the TMC Guide App — your personal companion for navigating
        the campus. Find classrooms, departments, events, and student services
        all in one place, making your school journey easier and more convenient.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("LoginScreen")} // 👈 goes to LoginScreen
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Let's Get Started →</Text>
      </TouchableOpacity>

      {/* Footer Text */}
      <Text style={styles.footerText}>© 2025 TMC Campus Navigation</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0810ebff",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#facc15",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 25,
    overflow: "hidden",
    elevation: 10,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#f3f4f6",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 35,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#facc15",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 17,
  },
  footerText: {
    color: "#ffffffaa",
    fontSize: 13,
    position: "absolute",
    bottom: 25,
  },
});
