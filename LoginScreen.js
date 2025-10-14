import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const scrollRef = useRef();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    schoolId: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (isRegister) {
      Alert.alert('Register Success', `Welcome ${formData.firstName} ${formData.lastName}`);
      navigation.replace('Onboarding'); // Navigate to features after register
    } else {
      Alert.alert('Login Success', `Login: ${formData.schoolId}`);
      navigation.replace('Onboarding'); // Navigate to features after login
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      schoolId: '',
      password: '',
      confirmPassword: '',
    });
    setShowPassword(false);
  };

  return (
    <View style={styles.container}>
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

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.formContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          {!isRegister ? (
            <>
              <TextInput
                style={styles.input}
                value={formData.schoolId}
                onChangeText={(value) => handleInputChange('schoolId', value)}
                placeholder="Enter School ID"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Enter Password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="First Name"
              />
              <TextInput
                style={styles.input}
                value={formData.middleName}
                onChangeText={(value) => handleInputChange('middleName', value)}
                placeholder="Middle Name (optional)"
              />
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Last Name"
              />
              <TextInput
                style={styles.input}
                value={formData.schoolId}
                onChangeText={(value) => handleInputChange('schoolId', value)}
                placeholder="School ID"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Password"
                secureTextEntry={!showPassword}
              />
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={handleSubmit} style={styles.registerButton}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={toggleForm}>
            <Text style={styles.switchText}>
              {isRegister ? 'Already have an account? Login' : 'Don’t have an account? Register'}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0044ff' },
  scrollContent: { flexGrow: 1, padding: 20, paddingTop: 60, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  logoContainer: { width: 96, height: 96, backgroundColor: '#ffcc00', borderRadius: 48, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  logoImage: { width: 64, height: 64, borderRadius: 32 },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffcc00', marginBottom: 8 },
  subTitle: { fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' },
  formContainer: { backgroundColor: '#fff', borderRadius: 20, padding: 24 },
  input: { borderWidth: 1, borderColor: '#bfdbfe', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, backgroundColor: '#eff6ff', marginBottom: 16 },
  loginButton: { backgroundColor: '#ffcc00', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  registerButton: { backgroundColor: '#ffcc00', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#1e40af' },
  switchText: { fontSize: 16, color: '#2563eb', textAlign: 'center', marginTop: 16 },
});
