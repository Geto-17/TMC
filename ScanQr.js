import React, { useState } from "react";
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
import roomsData from './rooms/roomsData';
import { LAB_LOCATIONS, openGoogleMaps, hasLocation, getLocation } from './data/labLocations';

export default function ScanQR() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    console.log("QR Code Scanned:", data);

    // Check if scanned data matches a room code
    if (roomsData[data]) {
      setSelectedRoom(roomsData[data]);
      setModalVisible(true);
      setScanning(false);
    } else {
      Alert.alert(
        "Room Not Found",
        `QR Code: ${data}\n\nThis room is not in our database yet.`,
        [{ 
          text: "Scan Again", 
          onPress: () => {
            setScanned(false);
          }
        }]
      );
    }
  };

  const handleOpenMaps = () => {
    if (!selectedRoom || !selectedRoom.id) {
      Alert.alert('Error', 'No location available for this room.');
      return;
    }

    const location = getLocation(selectedRoom.id);
    
    if (location) {
      openGoogleMaps(
        location.latitude,
        location.longitude,
        location.name
      );
    } else {
      Alert.alert('Error', 'Location data not available for this room.');
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
            <Text style={styles.scanSubText}>35 rooms available across campus</Text>
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
        <Text style={styles.featureLine}>• 📍 Open computer labs in Google Maps</Text>
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
                {/* Room Image */}
                <Image
                  source={selectedRoom.image}
                  style={styles.roomImage}
                  resizeMode="cover"
                />

                {/* Room Header with Location Icon */}
                <View style={styles.roomHeader}>
                  <View style={styles.roomTitleContainer}>
                    <View style={styles.roomTitleLeft}>
                      <Text style={styles.roomCode}>{selectedRoom.id}</Text>
                      <Text style={styles.roomName}>{selectedRoom.name}</Text>
                    </View>
                    
                    {/* Location Icon - Only for Computer Labs */}
                    {hasLocation(selectedRoom.id) && (
                      <TouchableOpacity
                        style={styles.locationButton}
                        onPress={handleOpenMaps}
                      >
                        <MaterialIcons name="location-on" size={32} color="#fff" />
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Show Building Info for Computer Labs */}
                  {hasLocation(selectedRoom.id) && getLocation(selectedRoom.id) && (
                    <View style={styles.buildingInfo}>
                      <MaterialIcons name="business" size={16} color="#666" />
                      <Text style={styles.buildingText}>
                        {getLocation(selectedRoom.id).building}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Google Maps Banner - Only for Computer Labs */}
                {hasLocation(selectedRoom.id) && (
                  <TouchableOpacity 
                    style={styles.mapsBanner}
                    onPress={handleOpenMaps}
                  >
                    <MaterialIcons name="map" size={24} color="#fff" />
                    <Text style={styles.mapsBannerText}>
                      Tap to open in Google Maps
                    </Text>
                    <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                  </TouchableOpacity>
                )}

                {/* Room Description */}
                <View style={styles.descriptionBox}>
                  <MaterialIcons name="place" size={18} color="#191970" />
                  <Text style={styles.descriptionText}>{selectedRoom.description}</Text>
                </View>

                {/* Room Info */}
                {selectedRoom.capacity > 0 && (
                  <View style={styles.infoRow}>
                    <MaterialIcons name="people" size={18} color="#666" />
                    <Text style={styles.infoText}>Capacity: {selectedRoom.capacity} students</Text>
                  </View>
                )}

                {/* Class Schedule */}
                <Text style={styles.scheduleHeader}>📅 Class Schedule</Text>
                
                {selectedRoom.schedule && selectedRoom.schedule.length > 0 ? (
                  <>
                    <Text style={styles.scheduleSubheader}>
                      All available block schedules for this room
                    </Text>
                    {selectedRoom.schedule.map((item, index) => (
                      <View key={index} style={styles.scheduleItem}>
                        <View style={styles.scheduleTopRow}>
                          <View style={styles.blockBadge}>
                            <Text style={styles.blockText}>{item.block}</Text>
                          </View>
                          <View style={styles.timeContainer}>
                            <MaterialIcons name="access-time" size={14} color="#191970" />
                            <Text style={styles.scheduleTime}>
                              {item.start} - {item.end}
                            </Text>
                          </View>
                        </View>
                        
                        <Text style={styles.scheduleSubject}>{item.subject}</Text>
                        
                        <View style={styles.scheduleDetails}>
                          <Text style={styles.scheduleInstructor}>
                            👨‍🏫 {item.instructor}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </>
                ) : (
                  <View style={styles.emptySchedule}>
                    <MaterialIcons name="event-busy" size={48} color="#ccc" />
                    <Text style={styles.emptyText}>No class schedule available</Text>
                    <Text style={styles.emptySubtext}>This room is available for special purposes</Text>
                  </View>
                )}

                <TouchableOpacity style={styles.scanAgainButton} onPress={closeModal}>
                  <MaterialIcons name="qr-code-scanner" size={20} color="#ffcc00" />
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
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#191970",
  },
  roomTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  roomTitleLeft: {
    flex: 1,
  },
  roomCode: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#191970",
    marginBottom: 4,
  },
  roomName: {
    fontSize: 18,
    color: "#666",
    fontWeight: "500",
  },
  locationButton: {
    backgroundColor: "#ef4444",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buildingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  buildingText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  mapsBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    gap: 10,
  },
  mapsBannerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  descriptionBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  descriptionText: {
    flex: 1,
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  scheduleHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#191970",
    marginBottom: 4,
    marginTop: 8,
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
  scheduleTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  blockBadge: {
    backgroundColor: "#191970",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  blockText: {
    color: "#ffcc00",
    fontSize: 11,
    fontWeight: "700",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  scheduleTime: {
    fontSize: 12,
    color: "#191970",
    fontWeight: "600",
  },
  scheduleSubject: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#191970",
    marginBottom: 6,
  },
  scheduleDetails: {
    flexDirection: "column",
  },
  scheduleInstructor: {
    fontSize: 13,
    color: "#555",
  },
  emptySchedule: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "600",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#bbb",
    marginTop: 4,
    textAlign: "center",
  },
  scanAgainButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191970",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 10,
    gap: 8,
  },
  scanAgainText: {
    color: "#ffcc00",
    fontSize: 16,
    fontWeight: "bold",
  },
});