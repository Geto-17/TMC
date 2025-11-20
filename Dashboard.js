import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ScanQr from "./ScanQr_MY_VERSION";
import Profile from "./Profile";
import Navigation from "./Navigation";
import About from "./About";

export default function Dashboard({ route, navigation }) {
  const [student, setStudent] = useState(route?.params?.student || {});
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <View style={styles.tabContent}>
            <View style={styles.headerUserRow}>
              {student.avatar ? (
                <Image source={{ uri: student.avatar }} style={styles.headerAvatar} />
              ) : (
                <View style={styles.headerAvatarPlaceholder}>
                  <Text style={styles.placeholderInitials}>
                    {((student.firstName || "")[0] || "").toUpperCase()}
                    {((student.lastName || "")[0] || "").toUpperCase()}
                  </Text>
                </View>
              )}

              <View style={styles.nameColumn}>
                <Text style={styles.greeting}>Welcome back, {student.firstName || ""}</Text>
                <Text style={styles.userName}>
                  {student.firstName} {student.middleName ? student.middleName + " " : ""}{student.lastName}
                </Text>
              </View>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Student ID</Text>
              <Text style={styles.infoValue}>{student.studentId}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Course</Text>
              <Text style={styles.infoValue}>{student.course}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Block</Text>
              <Text style={styles.infoValue}>{student.block}</Text>
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
        return <Profile student={student} setStudent={setStudent} />;
      case "about":
        return <About />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>

        {/* ✅ Logout button */}
        <TouchableOpacity
          onPress={() => navigation.replace("LoginScreen")}
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
          ["about", "info", "About"],
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
    backgroundColor: "#191970",
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
  userName: { fontSize: 20, fontWeight: "700", color: "#191970", marginBottom: 4 },
  headerUserRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  headerAvatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  headerAvatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  placeholderInitials: { color: '#666', fontWeight: '700', fontSize: 18 },
  nameColumn: { flexDirection: 'column', justifyContent: 'center' },
  infoBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  borderLeftColor: "#191970",
    elevation: 2,
  },
  infoLabel: { fontSize: 12, color: "#999", fontWeight: "600" },
  infoValue: { fontSize: 18, fontWeight: "bold", color: "#191970", marginTop: 4 },
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
    backgroundColor: "#191970",
    borderTopWidth: 1,
    borderTopColor: "#003399",
    elevation: 10,
  },
  tabButton: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 12 },
  activeTab: { borderTopWidth: 3, borderTopColor: "#ffcc00" },
  tabLabel: { fontSize: 10, color: "#fff", marginTop: 4 },
  activeLabel: { color: "#ffcc00", fontWeight: "600" },
});
