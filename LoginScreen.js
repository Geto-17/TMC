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
    studentId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    course: '',
    block: '',
    password: '',
    confirmPassword: '',
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
        !formData.password ||
        !formData.confirmPassword
      ) {
        Alert.alert('Registration Failed', 'Please fill out all required fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Registration Failed', 'Passwords do not match.');
        return;
      }
      Alert.alert('Registration Successful ✅', `Welcome, ${fullName}!`);
    } else {
      if (formData.studentId && formData.password) {
        Alert.alert('Access Granted 🎓', 'Welcome to TMC Campus Guide!');
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
                <Text style={styles.label}>Student ID:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.studentId}
                  onChangeText={(value) => handleInputChange('studentId', value)}
                  placeholder="Enter your student ID (e.g., 23-016046)"
                  autoCapitalize="none"
                />
                <Text style={styles.hintText}>Required, e.g., 23-016046</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password:</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
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
                    <Text style={styles.toggleText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>🔒 Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {['studentId', 'firstName', 'middleName', 'lastName', 'course', 'block', 'password', 'confirmPassword'].map((field) => (
                <View style={styles.inputGroup} key={field}>
                  <Text style={styles.label}>
                    {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}:
                  </Text>
                  <View style={field.includes('password') ? styles.passwordWrapper : null}>
                    <TextInput
                      style={[styles.input, field.includes('password') ? { flex: 1 } : null]}
                      value={formData[field]}
                      onChangeText={(value) => handleInputChange(field, value)}
                      placeholder={field === 'confirmPassword' ? "Re-enter your password" : `Enter your ${field}`}
                      secureTextEntry={field.includes('password') && !showPassword}
                      autoCapitalize="none"
                    />
                    {field.includes('password') && (
                      <TouchableOpacity
                        style={styles.passwordToggle}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Text style={styles.toggleText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {field === 'studentId' && <Text style={styles.hintText}>Required, e.g., 23-016046</Text>}
                </View>
              ))}

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
  container: {
    flex: 1, 
    backgroundColor: '#0044ff' 
    
  },
  scrollContent: { 
    flexGrow: 1,
    padding: 20,
    paddingTop: 60, 
    paddingBottom: 40,
    justifyContent: 'center'
    },
    
  header: { 
    alignItems: 'center', 
    marginBottom: 23
    
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
    shadowOffset: { 
      width: 0, 
      height: 4 
      
    }, 
    
    shadowOpacity: 0.3, 
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4, 
    borderColor: '#fff'
    },
    
  logoImage: { 
    width: 64,
    height: 64, 
    borderRadius: 32 
    
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold', 
    color: '#ffcc00', 
    marginBottom: 8,
    textAlign: 'center' 
    
  },
  

  subTitle: { 
    fontSize: 20,
    fontWeight: '600', 
    color: '#fff', 
    textAlign: 'center'
    },
    
  formContainer: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 24, 
    shadowColor: '#000', 
    shadowOffset: { 
      width: 0,
      height: 8 
    }, 
    
    shadowOpacity: 0.2, 
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1, 
    borderColor: '#bfdbfe' 
  },
  
  inputGroup: {
    marginBottom: 20
    },
    
  label: { 
    fontSize: 16,
    fontWeight: '500',
    color: '#1d4ed8',
    marginBottom: 8 
    
  },
  
  input: {
    borderWidth: 1, 
    borderColor: '#bfdbfe',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16, 
    backgroundColor: '#eff6ff'
    },
    
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
    },
    
  passwordToggle: {
    padding: 4,
    marginLeft: 8 
    
  },
  
  toggleText: {
    fontSize: 18,
    color: '#2563eb' 
    
  },
  
  loginButton: { 
    backgroundColor: '#ffcc00',
    paddingVertical: 16,
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10
    },
    
  registerButton: { 
    backgroundColor: '#ffcc00',
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10 
  },
  
  buttonText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1e40af'
    },
    
  switchContainer: { 
    alignItems: 'center',
    marginTop: 24, 
    paddingTop: 16, 
    borderTopWidth: 1,
    borderTopColor: '#bfdbfe'
    },
    
  switchText: { 
    fontSize: 16, 
    color: '#2563eb',
    textAlign: 'center' 
    
  },
  
  switchLink: {
    color: '#ffcc00',
    fontWeight: '500'
    },
    
  hintText: { 
    fontSize: 12,
    color: '#2563eb',
    marginTop: 4 },
});