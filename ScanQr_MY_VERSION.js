import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView,
  Image,
  Alert 
} from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from "@expo/vector-icons";

export default function ScanQR() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // ✅ COMPLETE ROOM DATA - Add your actual room images later
  const roomData = {
    "CL-01": {
      name: "CL-01",
      fullName: "Computer Laboratory 01",
      image: require("./assets/tmc-logo.jpg"), // Using logo as placeholder - replace with actual room photo
      schedule: [
        { time: "7:00 - 8:30 AM", subject: "Programming 1", instructor: "Prof. Santos", block: "BSIT Block 1" },
        { time: "8:30 - 10:00 AM", subject: "Data Structures", instructor: "Prof. Reyes", block: "BSIT Block 2" },
        { time: "10:00 - 11:30 AM", subject: "Web Development", instructor: "Prof. Cruz", block: "BSIT Block 3" },
        { time: "1:00 - 2:30 PM", subject: "Database Systems", instructor: "Prof. Garcia", block: "BSIT Block 4" },
        { time: "2:30 - 4:00 PM", subject: "Mobile Apps", instructor: "Prof. Dela Cruz", block: "BSIT Block 5" },
      ]
    },
    "CL-02": {
      name: "CL-02",
      fullName: "Computer Laboratory 02",
      image: require("./assets/rooms/CL-02.png"),
      schedule: [
        { time: "7:00 - 8:30 AM", subject: "IT ELEC 1", instructor: "Prof. Ramos", block: "BSIT Block 3" },
        { time: "8:30 - 10:00 AM", subject: "Networking", instructor: "Prof. Martinez", block: "BSIT Block 2" },
        { time: "10:00 - 11:30 AM", subject: "System Analysis", instructor: "Prof. Torres", block: "BSIT Block 4" },
        { time: "1:00 - 2:30 PM", subject: "Capstone Project", instructor: "Prof. Lopez", block: "BSIT Block 5" },
        { time: "2:30 - 4:00 PM", subject: "IT Management", instructor: "Prof. Fernandez", block: "BSIT Block 4" },
      ]
    },
    "M-101": {
      name: "M-101",
      fullName: "Main Building Room 101",
      image: require("./assets/tmc-logo.jpg"),
      schedule: [
        { time: "7:00 - 8:30 AM", subject: "Mathematics", instructor: "Prof. Brown", block: "BSIT Block 1" },
        { time: "8:30 - 10:00 AM", subject: "Statistics", instructor: "Prof. White", block: "BSIT Block 2" },
        { time: "10:00 - 11:30 AM", subject: "Algebra", instructor: "Prof. Green", block: "BSIT Block 1" },
        { time: "1:00 - 2:30 PM", subject: "Calculus", instructor: "Prof. Black", block: "BSIT Block 3" },
      ]
    },
    "M-102": {
      name: "M-102",
      fullName: "Main Building Room 102",
      image: require("./assets/tmc-logo.jpg"),
      schedule: [
        { time: "7:00 - 8:30 AM", subject: "English 1", instructor: "Prof. Wilson", block: "BSIT Block 1" },
        { time: "8:30 - 10:00 AM", subject: "Communication Skills", instructor: "Prof. Davis", block: "BSIT Block 2" },
        { time: "10:00 - 11:30 AM", subject: "Technical Writing", instructor: "Prof. Moore", block: "BSIT Block 3" },
      ]
    },
    "M-103": {
      name: "M-103",
      fullName: "Main Building Room 103",
      image: require("./assets/tmc-logo.jpg"),
      schedule: [
        { time: "7:30 - 9:00 AM", subject: "Physics 1", instructor: "Prof. Taylor", block: "BSIT Block 2" },
        { time: "10:00 - 11:30 AM", subject: "Physics Lab", instructor: "Prof. Anderson", block: "BSIT Block 2" },
      ]
    },
    "M-105": {
      name: "M-105",
      fullName: "Main Building Room 105",
      image: require("./assets/tmc-logo.jpg"),
      schedule: [
        { time: "8:00 - 9:30 AM", subject: "Chemistry", instructor: "Prof. Thomas", block: "BSIT Block 1" },
        { time: "1:00 - 2:30 PM", subject: "Chemistry Lab", instructor: "Prof. Jackson", block: "BSIT Block 1" },
      ]
    },
    "M-206": {
      name: "M-206",
      fullName: "Main Building Room 206",
      image: require("./assets/tmc-logo.jpg"),
      schedule: [
        { time: "7:00 - 8:30 AM", subject: "Software Engineering", instructor: "Prof. Harris", block: "BSIT Block 4" },
        { time: "10:00 - 11:30 AM", subject: "Project Management", instructor: "Prof. Clark", block: "BSIT Block 5" },
      ]
    },
    "M-207": {
      name: "M-207",
      fullName: "Main Building Room 207",
      image: require("./assets/tmc-logo.jpg"),
      schedule: [
        { time: "8:30 - 10:00 AM", subject: "Operating Systems", instructor: "Prof. Lewis", block: "BSIT Block 3" },
        { time: "2:00 - 3:30 PM", subject: "Computer Architecture", instructor: "Prof. Walker", block: "BSIT Block 2" },
      ]
    },
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    console.log("QR Code Scanned:", data); // For debugging

    // Check if scanned data matches a room code
    if (roomData[data]) {
      setSelectedRoom(roomData[data]);
      setModalVisible(true);
      setScanning(false);
    } else {
      Alert.alert(
        "Room Not Found",
        `QR Code: ${data}\n\nThis room is not in our database yet.\n\nAvailable rooms: CL-01, CL-02, M-101, M-102, M-103, M-105, M-206, M-207`,
        [{ 
          text: "Scan Again", 
          onPress: () => {
            setScanned(false);
          }
        }]
      );
    }
  };

  const startScanning = async () => {
    if (!permission) {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert("Permission Required", "Camera permission is required to scan QR codes.");
        return;
      }
    }
    
    if (permission && !permission.granted) {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Please enable camera permissions in your device settings.");
        return;
      }
    }
    
    setScanning(true);
    setScanned(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRoom(null);
    setScanned(false);
  };

  if (scanning) {
    return (
      <View style={styles.scannerContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>Scan a room QR code</Text>
            <Text style={styles.scanSubText}>Available: CL-01, CL-02, M-101, M-102, M-103, M-105, M-206, M-207</Text>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setScanning(false);
                setScanned(false);
              }}
            >
              <MaterialIcons name="close" size={24} color="#fff" />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scanBox}>
        <Text style={styles.scanIcon}>📱</Text>
      </View>

      <Text style={styles.title}>QR Code Scanner</Text>

      <Text style={styles.description}>
        Use your device camera to scan QR codes placed around campus. Get instant access to room information and class schedules.
      </Text>

      <TouchableOpacity style={styles.scanButton} onPress={startScanning}>
        <MaterialIcons name="qr-code-scanner" size={24} color="#fff" />
        <Text style={styles.scanButtonText}>Start Scanning</Text>
      </TouchableOpacity>

      <View style={styles.featureBox}>
        <Text style={styles.featureTitle}>Features</Text>
        <Text style={styles.featureLine}>• Scan room QR codes for location details</Text>
        <Text style={styles.featureLine}>• View class schedules instantly</Text>
        <Text style={styles.featureLine}>• Find instructor information</Text>
        <Text style={styles.featureLine}>• Real-time room availability</Text>
      </View>

      {/* Room Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
              <MaterialIcons name="close" size={28} color="#666" />
            </TouchableOpacity>

            {selectedRoom && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                  source={selectedRoom.image}
                  style={styles.roomImage}
                  resizeMode="cover"
                />

                <View style={styles.roomHeader}>
                  <Text style={styles.roomCode}>{selectedRoom.name}</Text>
                  <Text style={styles.roomName}>{selectedRoom.fullName}</Text>
                </View>

                <Text style={styles.scheduleHeader}>📅 Complete Class Schedule</Text>
                <Text style={styles.scheduleSubheader}>All available block schedules for this room</Text>

                {selectedRoom.schedule.length > 0 ? (
                  selectedRoom.schedule.map((item, index) => (
                    <View key={index} style={styles.scheduleItem}>
                      <View style={styles.timeContainer}>
                        <MaterialIcons name="access-time" size={16} color="#191970" />
                        <Text style={styles.scheduleTime}>{item.time}</Text>
                      </View>
                      <Text style={styles.scheduleSubject}>{item.subject}</Text>
                      <View style={styles.scheduleDetails}>
                        <Text style={styles.scheduleInstructor}>👨‍🏫 {item.instructor}</Text>
                        <Text style={styles.scheduleBlock}>📚 {item.block}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptySchedule}>
                    <Text style={styles.emptyText}>No schedule available</Text>
                  </View>
                )}

                <TouchableOpacity style={styles.scanAgainButton} onPress={closeModal}>
                  <Text style={styles.scanAgainText}>Scan Another Room</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#191970",
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
    color: "#191970",
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
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#191970",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
    gap: 8,
  },
  scanButtonText: {
    color: "#ffcc00",
    fontSize: 16,
    fontWeight: "bold",
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
    color: "#191970",
    marginBottom: 10,
  },
  featureLine: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
    lineHeight: 18,
  },
  scannerContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#ffcc00",
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  scanText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  scanSubText: {
    color: "#ffcc00",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 40,
    gap: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "85%",
    elevation: 5,
  },
  closeModalButton: {
    alignSelf: "flex-end",
    padding: 5,
    marginBottom: 10,
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#e6eefc",
  },
  roomHeader: {
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#191970",
  },
  roomCode: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#191970",
    marginBottom: 4,
  },
  roomName: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
  scheduleHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#191970",
    marginBottom: 4,
  },
  scheduleSubheader: {
    fontSize: 13,
    color: "#666",
    marginBottom: 16,
    fontStyle: "italic",
  },
  scheduleItem: {
    backgroundColor: "#e6eefc",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#191970",
    elevation: 1,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  scheduleTime: {
    fontSize: 13,
    color: "#191970",
    fontWeight: "700",
  },
  scheduleSubject: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#191970",
    marginBottom: 6,
  },
  scheduleDetails: {
    flexDirection: "column",
    gap: 4,
  },
  scheduleInstructor: {
    fontSize: 13,
    color: "#555",
  },
  scheduleBlock: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
  },
  emptySchedule: {
    padding: 30,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  scanAgainButton: {
    backgroundColor: "#191970",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
  },
  scanAgainText: {
    color: "#ffcc00",
    fontSize: 16,
    fontWeight: "bold",
  },
});