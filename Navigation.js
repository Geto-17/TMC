import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Navigation() {
  const mainCampus = [
    "CL-01",
    "CL-02",
    "M-101",
    "M-102",
    "M-103",
    "M-105",
    "M-206",
    "M-207",
    "Speech Lab",
    "Chem Lab",
    "Registrar",
    "Clinic",
  ];
  const extensionCampus = [
    "E-101",
    "E-102",
    "E-103",
    "E-104",
    "E-105",
    "E-201",
    "E-202",
    "E-203",
    "E-204",
    "E-205",
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Building and Room Guide</Text>

      <Text style={styles.description}>
        Find all campus locations with ease. The TMC Campus Guide provides complete information about building layouts and room locations.
      </Text>

      <View style={styles.campusBox}>
        <Text style={styles.campusTitle}>Main Campus</Text>
        <View style={styles.roomsGrid}>
          {mainCampus.map((room, idx) => (
            <View key={idx} style={styles.roomTag}>
              <Text style={styles.roomTagText}>{room}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.campusBox}>
        <Text style={styles.campusTitle}>Extension Campus</Text>
        <View style={styles.roomsGrid}>
          {extensionCampus.map((room, idx) => (
            <View key={idx} style={styles.roomTag}>
              <Text style={styles.roomTagText}>{room}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0044ff",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  campusBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  campusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0044ff",
    marginBottom: 12,
  },
  roomsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  roomTag: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  roomTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0044ff",
  },
});