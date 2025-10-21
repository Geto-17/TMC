import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";


export default function Profile({ student, navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    course: student?.course || "",
    block: student?.block || "",
  });

  const API_BASE = "http://10.196.44.129:3000";

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName || !formData.course || !formData.block) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const handleLogout = () => {
      Alert.alert(
    "Logout",
    "Are you sure you want to log out?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => navigation.replace("LoginScreen") },
    ]
  );
};

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/update/${student._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully");
        setIsEditing(false);
      } else {
        Alert.alert("Error", data.message || "Failed to update profile");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            navigation.navigate("LoginScreen");
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>👤</Text>
      </View>

      <Text style={styles.profileName}>
        {student?.firstName} {student?.lastName}
      </Text>
      <Text style={styles.profileId}>{student?.studentId}</Text>

      {!isEditing ? (
        <>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>First Name</Text>
            <Text style={styles.infoValue}>{formData.firstName}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Last Name</Text>
            <Text style={styles.infoValue}>{formData.lastName}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Course</Text>
            <Text style={styles.infoValue}>{formData.course}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Block</Text>
            <Text style={styles.infoValue}>{formData.block}</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.editGroup}>
            <Text style={styles.editLabel}>First Name</Text>
            <TextInput
              style={styles.editInput}
              value={formData.firstName}
              onChangeText={(value) => handleInputChange("firstName", value)}
              editable={!loading}
            />
          </View>

          <View style={styles.editGroup}>
            <Text style={styles.editLabel}>Last Name</Text>
            <TextInput
              style={styles.editInput}
              value={formData.lastName}
              onChangeText={(value) => handleInputChange("lastName", value)}
              editable={!loading}
            />
          </View>

          <View style={styles.editGroup}>
            <Text style={styles.editLabel}>Course</Text>
            <TextInput
              style={styles.editInput}
              value={formData.course}
              onChangeText={(value) => handleInputChange("course", value)}
              editable={!loading}
            />
          </View>

          <View style={styles.editGroup}>
            <Text style={styles.editLabel}>Block</Text>
            <TextInput
              style={styles.editInput}
              value={formData.block}
              onChangeText={(value) => handleInputChange("block", value)}
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, loading && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsEditing(false)}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#eff6ff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#0044ff",
  },
  avatar: {
    fontSize: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0044ff",
    textAlign: "center",
    marginBottom: 4,
  },
  profileId: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "500",
  },
  infoBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#0044ff",
    elevation: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: "#999",
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0044ff",
  },
  editButton: {
    backgroundColor: "#0044ff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffcc00",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  editGroup: {
    marginBottom: 14,
  },
  editLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0044ff",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#eff6ff",
  },
  saveButton: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});