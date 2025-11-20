import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Dropdown from "./components/Dropdown";

export default function LoginScreen({ navigation }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    course: "",
    block: "",
    gender: "",
    password: "",
  });

  // ⚠️ IMPORTANT: Your laptop's IP address - change this if it changes
  const API_BASE = "http://10.0.61.182:3000";  // ← Your hotspot IP

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (isRegister) {
      // ========== REGISTRATION ==========
      if (
        !formData.studentId ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.course ||
        !formData.block ||
        !formData.password
      ) {
        Alert.alert('Registration Failed', 'Please fill out all required fields.');
        return;
      }

      setLoading(true);
      try {
        console.log('Attempting to register at:', `${API_BASE}/register`);
        
        const response = await fetch(`${API_BASE}/register`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            studentId: formData.studentId,
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            course: formData.course,
            block: formData.block,
            gender: formData.gender,
            password: formData.password,
          }),
        });

        const data = await response.json();
        console.log('Register response:', data);

        if (response.ok) {
          Alert.alert(
            'Registration Successful ✅', 
            `Welcome, ${formData.firstName}! You can now login.`,
            [
              {
                text: 'OK',
                onPress: () => {
                  // Switch to login and keep studentId
                  setIsRegister(false);
                  setFormData(prev => ({
                    ...prev,
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    course: '',
                    block: '',
                    gender: '',
                    password: ''
                  }));
                }
              }
            ]
          );
        } else {
          Alert.alert('Registration Failed', data.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        Alert.alert(
          'Connection Error',
          `Cannot connect to server at ${API_BASE}\n\nMake sure:\n1. Backend is running (npm start)\n2. Both devices are on same WiFi\n3. IP address is correct (${API_BASE})`
        );
      } finally {
        setLoading(false);
      }

    } else {
      // ========== LOGIN ==========
      if (!formData.studentId || !formData.password) {
        Alert.alert('Login Failed', 'Please enter both Student ID and Password.');
        return;
      }

      setLoading(true);
      try {
        console.log('Attempting to login at:', `${API_BASE}/login`);
        
        const response = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            studentId: formData.studentId,
            password: formData.password,
          }),
        });

        const data = await response.json();
        console.log('Login response:', data);

        if (response.ok && data.student) {
          Alert.alert(
            'Access Granted 🎓', 
            `Welcome back, ${data.student.firstName}!`,
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.replace('Dashboard', { student: data.student });
                }
              }
            ]
          );
        } else {
          Alert.alert('Login Failed', data.message || 'Invalid Student ID or Password.');
        }
      } catch (error) {
        console.error('Login error:', error);
        Alert.alert(
          'Connection Error',
          `Cannot connect to server at ${API_BASE}\n\nMake sure:\n1. Backend is running (npm start)\n2. Both devices are on same WiFi\n3. IP address is correct (${API_BASE})`
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({
      studentId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      course: '',
      block: '',
      gender: '',
      password: '',
    });
    setShowPassword(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={40}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("./assets/tmc-logo.jpg")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.mainTitle}>TMC CAMPUS GUIDE</Text>
          <Text style={styles.subTitle}>
            {isRegister ? 'CREATE NEW ACCOUNT' : 'LOGIN'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          {!isRegister ? (
            // ========== LOGIN FORM ==========
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Student ID:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.studentId}
                  onChangeText={(value) => handleInputChange('studentId', value)}
                  placeholder="Enter your student ID (e.g., 23-016046)"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  <Text style={styles.toggleText}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[styles.loginButton, loading && styles.buttonDisabled]} 
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#191970" size="small" />
                ) : (
                  <Text style={styles.buttonText}>🔒 Login</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            // ========== REGISTRATION FORM ==========
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Student ID:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.studentId}
                  onChangeText={(v) => handleInputChange('studentId', v)}
                  placeholder="Enter your student ID (e.g., 23-016046)"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>First Name:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.firstName}
                  onChangeText={(v) => handleInputChange('firstName', v)}
                  placeholder="Enter your first name"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Middle Name (optional):</Text>
                <TextInput
                  style={styles.input}
                  value={formData.middleName}
                  onChangeText={(v) => handleInputChange('middleName', v)}
                  placeholder="Enter your middle name"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.lastName}
                  onChangeText={(v) => handleInputChange('lastName', v)}
                  placeholder="Enter your last name"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender:</Text>
                <Dropdown
                  label="Gender"
                  options={["Male", "Female"]}
                  selected={formData.gender}
                  onSelect={(v) => handleInputChange('gender', v)}
                  placeholder="Select gender"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Course:</Text>
                <Dropdown
                  label="Course"
                  options={["BSIT", "BSCRIM", "BOED", "BSOA", "POLSCI"]}
                  selected={formData.course}
                  onSelect={(v) => handleInputChange('course', v)}
                  placeholder="Select course"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Block:</Text>
                <Dropdown
                  label="Block"
                  options={
                    formData.course === 'BSIT'
                      ? ['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5']
                      : ['Block 1', 'Block 2', 'Block 3']
                  }
                  selected={formData.block}
                  onSelect={(v) => handleInputChange('block', v)}
                  placeholder="Select block"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  placeholder="Create a password"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  <Text style={styles.toggleText}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[styles.registerButton, loading && styles.buttonDisabled]} 
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffcc00" size="small" />
                ) : (
                  <Text style={styles.registerButtonText}>✅ Register Account</Text>
                )}
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={toggleForm} style={styles.switchContainer} disabled={loading}>
            <Text style={styles.switchText}>
              {isRegister
                ? 'Already have an account? '
                : "Don't have an account? "}
              <Text style={styles.switchLink}>
                {isRegister ? 'Login Here' : 'Register Here'} →
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#191970" },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
  header: { alignItems: "center", marginBottom: 40 },
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
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  mainTitle: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#ffcc00", 
    marginBottom: 8,
    textAlign: "center",
  },
  subTitle: { 
    fontSize: 20, 
    fontWeight: "600", 
    color: "#fff",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1d4ed8',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#eff6ff',
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 40,
    padding: 4,
  },
  toggleText: {
    fontSize: 14,
    color: '#2563eb',
  },
  loginButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  registerButton: {
    backgroundColor: "#191970",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191970',
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffcc00',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  switchContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#bfdbfe',
  },
  switchText: {
    fontSize: 16,
    color: '#2563eb',
    textAlign: 'center',
  },
  switchLink: {
    color: '#ffcc00',
    fontWeight: '500',
  },
});