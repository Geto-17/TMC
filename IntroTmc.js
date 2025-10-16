import React, { useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Animated 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require("./assets/tmc-logo.jpg")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>TMC Guide App</Text>

      <Text style={styles.description}>
        Welcome to the TMC Guide App - your personal companion for navigating 
        the campus. Find classrooms, departments, events, and student services 
        all in one place, making your school journey easier and more convenient.
      </Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Onboarding')}
        accessibilityLabel="Get started with TMC Guide"
      >
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>© TMC 2025 - All Rights Reserved</Text>
    </Animated.View>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    letterSpacing: 1,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#facc15",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 20,
    opacity: 0.8,
  },
});