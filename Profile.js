import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"; // ✅ Add this
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import { API_BASE } from "./config";
import Dropdown from "./components/Dropdown";

export default function Profile({ student, setStudent }) {
  const navigation = useNavigation(); // ✅ ensures navigation works inside tab
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    course: student?.course || "",
    block: student?.block || "",
    gender: student?.gender || "",
  });

  // API_BASE is imported from ./config.js (set your machine IP there)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [avatarUri, setAvatarUri] = useState(student?.avatar || null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Permission to access media library is required.");
        return;
      }

      // Launch picker without base64 to avoid memory spikes; we'll manipulate the image separately
      // Determine a safe mediaTypes value that works across expo-image-picker versions
      const mediaTypes = ImagePicker.MediaType?.Images ?? ImagePicker.MediaTypeOptions?.Images ?? ImagePicker.MediaTypeOptions?.All ?? ImagePicker.MediaTypeOptions?.Images ?? ImagePicker.MediaTypeOptions;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes,
        allowsEditing: true,
        quality: 1,
        base64: false,
      });

      const cancelled = result.cancelled ?? result.canceled ?? false;
      const pickedUri = result.uri ?? result?.assets?.[0]?.uri;

      if (!cancelled && pickedUri) {
        setUploading(true);
        try {
          // Resize/compress image to a reasonable max width to handle large files gracefully
          const MAX_WIDTH = 1024; // px
          const MANIPULATE_QUALITY = 0.75; // 0..1

          const manipResult = await ImageManipulator.manipulateAsync(
            pickedUri,
            [{ resize: { width: MAX_WIDTH } }],
            { compress: MANIPULATE_QUALITY, format: ImageManipulator.SaveFormat.JPEG, base64: true }
          );

          const resizedBase64 = manipResult.base64;
          const resizedUri = manipResult.uri;

          // Prefer multipart/form-data upload to avoid JSON body size limits and "request entity too large" errors.
          // We still keep a quick local preview by setting avatarUri to the resized data URI if available.
          if (resizedBase64) {
            const dataUri = `data:image/jpeg;base64,${resizedBase64}`;
            setAvatarUri(dataUri);
          } else if (resizedUri) {
            setAvatarUri(resizedUri);
          }

          // Upload the resized file via multipart form (uploadAvatar handles the POST and updates state on success)
          await uploadAvatar(resizedUri || pickedUri);
        } catch (err) {
          console.error('Image processing/upload error', err);
          Alert.alert('Error', 'Could not process or upload image');
        } finally {
          setUploading(false);
        }
      }
    } catch (err) {
      console.error('Image pick error', err);
      Alert.alert('Error', 'Could not open image picker');
    }
  };

  const uploadAvatar = async (uri) => {
    if (!student?._id) {
      Alert.alert('Error', 'Student id missing');
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      if (!uri) throw new Error('No image uri');
      const filename = uri.split('/').pop();
      const match = /\.([0-9a-z]+)(?:[?#]|$)/i.exec(filename || '');
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      body.append('avatar', {
        uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
        name: filename,
        type,
      });

      // Let fetch set the Content-Type with boundary
      const uploadUrl = `${API_BASE}/upload-avatar/${student._id}`;
      console.log('Uploading to', uploadUrl);
      const res = await fetch(uploadUrl, {
        method: 'POST',
        body,
      });

      // Read response text first (avoids 'Already read' when parsing fails)
      const resText = await res.text();
      let data;
      try {
        data = JSON.parse(resText);
      } catch (parseErr) {
        console.error('Upload response not JSON:', resText);
        Alert.alert('Upload error', `Server response: ${resText}`);
        return;
      }

      if (res.ok && data && data.student) {
        setAvatarUri(data.student.avatar);
        if (typeof setStudent === 'function') setStudent(data.student);
        Alert.alert('Success', 'Avatar uploaded');
      } else {
        console.error('Upload failed', data);
        Alert.alert('Upload failed', (data && data.message) || 'Could not upload avatar');
      }
    } catch (err) {
      console.error('Upload error', err);
      Alert.alert('Error', 'Unable to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName || !formData.course || !formData.block) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/update/${student._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data && data.student) {
        // Update local formData with returned values
        setFormData((prev) => ({
          ...prev,
          firstName: data.student.firstName || prev.firstName,
          lastName: data.student.lastName || prev.lastName,
          course: data.student.course || prev.course,
          block: data.student.block || prev.block,
        }));

        // If parent passed a setter, update parent state so Dashboard reflects changes
        if (typeof setStudent === "function") {
          setStudent(data.student);
        }

        Alert.alert("Success", "Profile updated successfully");
        setIsEditing(false);
      } else {
        Alert.alert("Error", (data && data.message) || "Failed to update profile");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} keyboardVerticalOffset={30}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={styles.avatarContainer}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatar}>👤</Text>
        )}
        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
          <MaterialIcons name="photo-camera" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.profileName}>
        {formData.firstName} {formData.lastName}
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
            
            <Dropdown
              label="Course"
              options={["BSIT", "BSCRIM", "BOED", "BSOA", "POLSCI"]}
              selected={formData.course}
              onSelect={(value) => handleInputChange('course', value)}
              placeholder="Select course"
            />
          </View>

          <View style={styles.editGroup}>
            
            <Dropdown
              label="Block"
              options={
                formData.course === 'BSIT'
                  ? ['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5']
                  : ['Block 1', 'Block 2', 'Block 3']
              }
              selected={formData.block}
              onSelect={(value) => handleInputChange('block', value)}
              placeholder="Select block"
            />
          </View>

          <View style={styles.editGroup}>
            
            <Dropdown
              label="Gender"
              options={["Male", "Female"]}
              selected={formData.gender}
              onSelect={(value) => handleInputChange('gender', value)}
              placeholder="Select gender"
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#e6eefc",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "center",
    borderWidth: 3,
  borderColor: "#191970",
  },
  avatar: {
    fontSize: 50,
  },
  avatarImage: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  cameraButton: {
    position: 'absolute',
    right: -6,
    bottom: -6,
    backgroundColor: '#191970',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0033cc",
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
    borderLeftColor: "#0033cc",
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
    color: "#0033cc",
  },
  editButton: {
    backgroundColor: "#0033cc",
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
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    elevation: 3,
  },
  editGroup: {
    marginBottom: 14,
  },
  editLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0033cc",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#e6eefc",
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
