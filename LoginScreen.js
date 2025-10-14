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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    department: '',
    year: '',
    age: '',
    schoolId: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (isRegister) {
      if (!formData.username || !formData.password || !formData.confirmPassword) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match!');
        return;
      }

      const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
      Alert.alert('Register Success', `Welcome, ${fullName}!`);
      navigation.navigate('Onboarding'); // Go to features screen

    } else {
      if (!formData.username || !formData.password) {
        Alert.alert('Error', 'Please fill in your username and password.');
        return;
      }
      Alert.alert('Login Success', `Welcome back, ${formData.username}!`);
      navigation.navigate('Onboarding'); // Go to features screen
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      department: '',
      year: '',
      age: '',
      schoolId: '',
      username: '',
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
          <Text style={styles.subTitle}>{isRegister ? 'CREATE NEW ACCOUNT' : 'LOGIN'}</Text>
        </View>

        <View style={styles.formContainer}>
          {!isRegister ? (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.username}
                  onChangeText={(value) => handleInputChange('username', value)}
                  placeholder="Enter your username"
                  autoCapitalize="none"
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
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.toggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>🔒 Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>First Name:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                  placeholder="Enter your first name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Middle Name:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.middleName}
                  onChangeText={(value) => handleInputChange('middleName', value)}
                  placeholder="Enter your middle name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                  placeholder="Enter your last name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Department:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.department}
                  onChangeText={(value) => handleInputChange('department', value)}
                  placeholder="Enter your department"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Year:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.year}
                  onChangeText={(value) => handleInputChange('year', value)}
                  placeholder="Enter your year"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Age:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.age}
                  onChangeText={(value) => handleInputChange('age', value)}
                  placeholder="Enter your age"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>School ID:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.schoolId}
                  onChangeText={(value) => handleInputChange('schoolId', value)}
                  placeholder="Enter your school ID"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.username}
                  onChangeText={(value) => handleInputChange('username', value)}
                  placeholder="Choose a username"
                  autoCapitalize="none"
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
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  placeholder="Confirm your password"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>✅ Register Account</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={toggleForm} style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isRegister ? 'Already have an account? ' : "Don’t have an account? "}
              <Text style={styles.switchLink}>{isRegister ? 'Login Here' : 'Register Here'} →</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0044ff' },
  scrollContent: { flexGrow: 1, padding: 20, paddingTop: 60, paddingBottom: 40, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  logoContainer: { width: 96, height: 96, backgroundColor: '#ffcc00', borderRadius: 48, justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 4, borderColor: '#fff' },
  logoImage: { width: 64, height: 64, borderRadius: 32 },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffcc00', marginBottom: 8, textAlign: 'center' },
  subTitle: { fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' },
  formContainer: { backgroundColor: '#fff', borderRadius: 20, padding: 24 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '500', color: '#1d4ed8', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#bfdbfe', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, backgroundColor: '#eff6ff' },
  passwordToggle: { position: 'absolute', right: 16, top: 40, padding: 4 },
  toggleText: { fontSize: 14, color: '#2563eb' },
  loginButton: { backgroundColor: '#ffcc00', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  registerButton: { backgroundColor: '#ffcc00', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#1e40af' },
  switchContainer: { alignItems: 'center', marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#bfdbfe' },
  switchText: { fontSize: 16, color: '#2563eb', textAlign: 'center' },
  switchLink: { color: '#ffcc00', fontWeight: '500' },
});
