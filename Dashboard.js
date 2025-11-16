import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ScanQr from "./ScanQr";
import Profile from "./Profile";
import Navigation from "./Navigation";

export default function Dashboard({ route, navigation }) {
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    // Get student data from route params
    if (route?.params?.student) {
      console.log("Student data received:", route.params.student);
      setStudent(route.params.student);
    } else {
      console.log("No student data found!");
      Alert.alert(
        "Error",
        "No student data found. Please login again.",
        [{ text: "OK", onPress: () => navigation.replace("LoginScreen") }]
      );
    }
  }, [route?.params?.student]);

  // Show loading while waiting for student data
  if (!student) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Loading...</Text>
        </View>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => navigation.replace("LoginScreen") 
        }
      ]
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.greeting}>Welcome</Text>
            <Text style={styles.userName}>
              {student.firstName || "Student"} {student.lastName || ""}
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Student ID</Text>
              <Text style={styles.infoValue}>{student.studentId || "N/A"}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Course</Text>
              <Text style={styles.infoValue}>{student.course || "N/A"}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Block</Text>
              <Text style={styles.infoValue}>{student.block || "N/A"}</Text>
            </View>

            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                Use the tabs below to navigate the campus, scan QR codes,
                manage your profile, or view building information.
              </Text>
            </View>
          </View>
        );
      case "nav":
        return <Navigation />;
      case "scan":
        return <ScanQr />;
      case "profile":
        return <Profile student={student} navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>

        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          <MaterialIcons name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>{renderContent()}</View>

      <View style={styles.tabBar}>
        {[
          ["home", "home", "Home"],
          ["nav", "location-on", "Navigate"],
          ["scan", "qr-code", "Scan"],
          ["profile", "person", "Profile"],
        ].map(([key, icon, label]) => (
          <TouchableOpacity
            key={key}
            style={[styles.tabButton, activeTab === key && styles.activeTab]}
            onPress={() => setActiveTab(key)}
          >
            <MaterialIcons
              name={icon}
              size={24}
              color={activeTab === key ? "#ffcc00" : "#fff"}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === key && styles.activeLabel,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#0044ff",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 20,
    position: "relative",
  },
  logoutButton: { position: "absolute", right: 20, top: 45 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#ffcc00" },
  contentContainer: { flex: 1, padding: 16 },
  tabContent: { flex: 1 },
  greeting: { fontSize: 16, color: "#666", marginBottom: 2 },
  userName: { fontSize: 32, fontWeight: "bold", color: "#0044ff", marginBottom: 24 },
  infoBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#0044ff",
    elevation: 2,
  },
  infoLabel: { fontSize: 12, color: "#999", fontWeight: "600" },
  infoValue: { fontSize: 18, fontWeight: "bold", color: "#0044ff", marginTop: 4 },
  descriptionBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    elevation: 2,
  },
  descriptionText: { fontSize: 14, color: "#666", lineHeight: 20 },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#0044ff",
    borderTopWidth: 1,
    borderTopColor: "#003399",
    elevation: 10,
  },
  tabButton: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 12 },
  activeTab: { borderTopWidth: 3, borderTopColor: "#ffcc00" },
  tabLabel: { fontSize: 10, color: "#fff", marginTop: 4 },
  activeLabel: { color: "#ffcc00", fontWeight: "600" },
});