import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ScanQR() {
  return (
    <View style={styles.container}>
      <View style={styles.scanBox}>
        <Text style={styles.scanIcon}>📱</Text>
      </View>

      <Text style={styles.title}>QR Code Scanner</Text>

      <Text style={styles.description}>
        Use your device camera to scan QR codes placed around campus. Get instant access to room information and class schedules.
      </Text>

      <View style={styles.featureBox}>
        <Text style={styles.featureTitle}>Features</Text>
        <Text style={styles.featureLine}>• Scan room QR codes for location details</Text>
        <Text style={styles.featureLine}>• View class schedules instantly</Text>
        <Text style={styles.featureLine}>• Find instructor information</Text>
        <Text style={styles.featureLine}>• Real-time room availability</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scanBox: {
    width: 120,
    height: 120,
    backgroundColor: "#0044ff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  scanIcon: {
    fontSize: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0044ff",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  featureBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    elevation: 2,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0044ff",
    marginBottom: 10,
  },
  featureLine: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
    lineHeight: 18,
  },
});