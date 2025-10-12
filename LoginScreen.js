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

export default function LoginScreen({ navigation }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    course: '',
    block: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (isRegister) {
      const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();
      Alert.alert('Register Success', `Register: ${fullName} - ${formData.course} - ${formData.block} - ${formData.email}`);
      // Optionally: navigation.navigate('Home') or similar after real API call
    } else {
      Alert.alert('Login Success', `Login: ${formData.username} - ${formData.password}`);
      // Optionally: navigation.navigate('Home') or similar after real API call
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    // Reset form data when switching if needed
    setFormData({
      username: '',
      firstName: '',
      middleName: '',
      lastName: '',
      course: '',
      block: '',
      email: '',
      password: '',
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
        {/* Header */}
        <View style={styles.header}>
          {/* Circular Logo Area */}
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

        {/* Form */}
        <View style={styles.formContainer}>
          {!isRegister ? (
            // Login Form
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
                  <Text style={styles.toggleText}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>🔒 Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Register Form
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
                  placeholder="Enter your middle name (optional)"
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
                <Text style={styles.label}>Course:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.course}
                  onChangeText={(value) => handleInputChange('course', value)}
                  placeholder="Enter your course"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Block:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.block}
                  onChangeText={(value) => handleInputChange('block', value)}
                  placeholder="Enter your block"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  placeholder="Enter your email"
                  keyboardType="email-address"
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
                  <Text style={styles.toggleText}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>✅ Register Account</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Switch Link */}
          <TouchableOpacity onPress={toggleForm} style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isRegister
                ? 'Already have an account? '
                : "Don’t have an account? "}
              <Text style={styles.switchLink}>
                {isRegister ? 'Login Here' : 'Register Here'} →
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0044ff', // Matches your Onboarding blue theme
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#ffcc00', // Yellow theme
    borderRadius: 48, // Circular
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#fff',
  },
  logoImage: {
    width: 64,
    height: 64,
    borderRadius: 32, // Keep circular if logo is square
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffcc00', // Yellow
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff', // White for contrast on blue bg
    textAlign: 'center',
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
    borderColor: '#bfdbfe', // Light blue border
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1d4ed8', // Blue theme
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bfdbfe', // Light blue
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#eff6ff', // Light blue bg
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 40, // Adjust based on input padding
    padding: 4,
  },
  toggleText: {
    fontSize: 14,
    color: '#2563eb', // Blue
  },
  loginButton: {
    backgroundColor: '#ffcc00', // Yellow
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
    backgroundColor: '#ffcc00', // Yellow for consistency
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
    color: '#1e40af', // Dark blue text on yellow
  },
  switchContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#bfdbfe', // Light blue
  },
  switchText: {
    fontSize: 16,
    color: '#2563eb', // Blue
    textAlign: 'center',
  },
  switchLink: {
    color: '#ffcc00', // Yellow for link
    fontWeight: '500',
  },
});
