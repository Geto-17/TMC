import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    schoolId: '',
    department: '',
    year: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      username: '',
      schoolId: '',
      department: '',
      year: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setShowPassword(false);
  };

  const handleRegister = async () => {
    const {
      firstName,
      lastName,
      username,
      schoolId,
      department,
      year,
      age,
      email,
      password,
      confirmPassword,
    } = formData;

    if (!firstName || !lastName || !username || !schoolId || !department || !year || !age || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const duplicate = users.find(
        user => user.username === username || user.schoolId === schoolId
      );
      if (duplicate) {
        Alert.alert('Error', 'User already registered.');
        return;
      }

      users.push({
        firstName,
        middleName: formData.middleName,
        lastName,
        username,
        schoolId,
        department,
        year,
        age,
        email,
        password,
      });

      await AsyncStorage.setItem('users', JSON.stringify(users));
      Alert.alert('Success', 'Registration successful! You can now log in.');
      toggleForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    const { username, password } = formData;
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(
        user => user.username === username && user.password === password
      );

      if (user) {
        navigation.navigate('WelcomeScreen', { user });
      } else {
        Alert.alert('Error', 'Invalid username or password.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.mainTitle}>TMC CAMPUS GUIDE</Text>
        <Text style={styles.subTitle}>{isRegister ? 'Register' : 'Login'}</Text>

        <View style={styles.formContainer}>
          {!isRegister ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={formData.username}
                onChangeText={val => handleInputChange('username', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={val => handleInputChange('password', val)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.toggleText}>
                  {showPassword ? 'Hide' : 'Show'} Password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>🔒 Login</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={formData.firstName}
                onChangeText={val => handleInputChange('firstName', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Middle Name (Optional)"
                value={formData.middleName}
                onChangeText={val => handleInputChange('middleName', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={val => handleInputChange('lastName', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={formData.username}
                onChangeText={val => handleInputChange('username', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="School ID"
                value={formData.schoolId}
                onChangeText={val => handleInputChange('schoolId', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Department"
                value={formData.department}
                onChangeText={val => handleInputChange('department', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Year Level"
                value={formData.year}
                onChangeText={val => handleInputChange('year', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Age"
                value={formData.age}
                onChangeText={val => handleInputChange('age', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={val => handleInputChange('email', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={val => handleInputChange('password', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                value={formData.confirmPassword}
                onChangeText={val => handleInputChange('confirmPassword', val)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.toggleText}>
                  {showPassword ? 'Hide' : 'Show'} Password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>✅ Register</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={toggleForm} style={{marginTop: 10}}>
            <Text style={styles.switchText}>
              {isRegister
                ? 'Already have an account? Login →'
                : "Don’t have an account? Register →"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0044ff', padding: 20 },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffcc00', textAlign: 'center', marginBottom: 12 },
  subTitle: { fontSize: 20, color: '#fff', textAlign: 'center', marginBottom: 20 },
  formContainer: { backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  input: { borderWidth: 1, borderColor: '#bfdbfe', borderRadius: 10, padding: 12, marginBottom: 12, backgroundColor: '#eff6ff' },
  button: { backgroundColor: '#ffcc00', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { fontWeight: 'bold', color: '#1e40af', fontSize: 16 },
  toggleText: { color: '#2563eb', marginBottom: 10, textAlign: 'right' },
  switchText: { color: '#2563eb', textAlign: 'center', marginTop: 10 },
});
