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
  KeyboardAvoidingView,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    course: '',
    block: '',
    password: '',
  });
  

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
  if (isRegister) {
    const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim();

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

    Alert.alert('Registration Successful ✅', `Welcome, ${fullName}!`);

  } else {
    if (formData.studentId && formData.password) {
      Alert.alert(
  'Access Granted 🎓',
  'Welcome to TMC Campus Guide!',
  [
    {
      text: 'OK',
      onPress: () => navigation.replace('Dashboard'),
    },
  ]
);

    } else {
      Alert.alert('Invalid Credentials', 'Please check your Student ID and Password.');
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

            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Student ID:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.studentId}
                  onChangeText={(value) => handleInputChange('studentId', value)}
                  placeholder="Enter your student ID (e.g., 23-016046)"
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

            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Student ID:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.studentId}
                  onChangeText={(value) => handleInputChange('studentId', value)}
                  placeholder="Enter your student ID (e.g., 23-016046)"
                  autoCapitalize="none"
                />
              </View>

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
                <Text style={styles.label}>Password:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  placeholder="Create a password"
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
    backgroundColor: '#0044ff',
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
    backgroundColor: '#ffcc00',
    borderRadius: 48,
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
    borderRadius: 32,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffcc00',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
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
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
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
