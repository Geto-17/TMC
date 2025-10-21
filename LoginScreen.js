import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

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
    password: "",
  });

  const API_BASE = "http://10.196.44.129:3000"; // Update to your IP if needed

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      studentId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      course: "",
      block: "",
      password: "",
    });
  };

  const handleSubmit = async () => {
    if (isRegister) {
      if (
        !formData.studentId ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.course ||
        !formData.block ||
        !formData.password
      ) {
        Alert.alert("Error", "Please fill in all required fields.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert(
            "Registration Successful 🎉",
            `Welcome, ${formData.firstName}! You can now login.`
          );
          setIsRegister(false);
          resetForm();
        } else {
          Alert.alert("Registration Failed", data.message || "Please try again.");
        }
      } catch (error) {
        Alert.alert("Error", "Unable to connect to the server.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      if (!formData.studentId || !formData.password) {
        Alert.alert("Error", "Please enter Student ID and Password.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: formData.studentId.trim(),
            password: formData.password.trim(),
          }),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert(
            "Access Granted 🎓",
            `Welcome to TMC Campus Guide, ${data.student.firstName}!`
          );
          resetForm();
          navigation.replace("Dashboard", { student: data.student });
        } else {
          Alert.alert(
            "Invalid Credentials",
            data.message || "Check your Student ID and Password."
          );
        }
      } catch (error) {
        Alert.alert("Error", "Unable to connect to the server.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    resetForm();
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
          <View style = {styles.logoContainer}>
              <Image
                source={require("./assets/tmc-logo.jpg")}
                style= {styles.logo}
                />
              </View>
          <Text style={styles.mainTitle}>TMC CAMPUS GUIDE</Text>
          <Text style={styles.subTitle}>
            {isRegister ? "CREATE NEW ACCOUNT" : "LOGIN"}
          </Text>
        </View>

        <View style={styles.formContainer}>
          {!isRegister ? (
            <>
              {/* LOGIN FORM */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Student ID:</Text>
                <TextInput
                  style={styles.input}
                  value={formData.studentId}
                  onChangeText={(v) => handleInputChange("studentId", v)}
                  placeholder="Enter your student ID (e.g., 23-016046)"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password:</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(v) => handleInputChange("password", v)}
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
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.loginButton, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#0044ff" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* REGISTER FORM */}
              {[
                ["studentId", "Student ID"],
                ["firstName", "First Name"],
                ["middleName", "Middle Name (optional)"],
                ["lastName", "Last Name"],
                ["course", "Course"],
                ["block", "Block"],
              ].map(([field, label]) => (
                <View key={field} style={styles.inputGroup}>
                  <Text style={styles.label}>{label}:</Text>
                  <TextInput
                    style={styles.input}
                    value={formData[field]}
                    onChangeText={(v) => handleInputChange(field, v)}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    editable={!loading}
                  />
                </View>
              ))}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password:</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(v) => handleInputChange("password", v)}
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
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.registerButton, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Register Account</Text>
                )}
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            onPress={toggleForm}
            style={styles.switchContainer}
            disabled={loading}
          >
            <Text style={styles.switchText}>
              {isRegister
                ? "Already have an account? "
                : "Don't have an account? "}
              <Text style={styles.switchLink}>
                {isRegister ? "Login Here" : "Register Here"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0044ff" },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "center",
  },
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

  logo : {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
  header: { alignItems: "center", marginBottom: 40 },
  
  logoText: { fontSize: 48, fontWeight: "bold", color: "#0044ff" },
  mainTitle: { fontSize: 28, fontWeight: "bold", color: "#ffcc00", marginBottom: 8 },
  subTitle: { fontSize: 20, fontWeight: "600", color: "#fff" },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    elevation: 5,
  },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "500", color: "#1d4ed8", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#eff6ff",
  },
  passwordContainer: { position: "relative" },
  passwordToggle: { position: "absolute", right: 16, top: 12, padding: 4 },
  toggleText: { fontSize: 14, color: "#2563eb", fontWeight: "600" },
  loginButton: {
    backgroundColor: "#ffcc00",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  registerButton: {
    backgroundColor: "#0044ff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  switchContainer: {
    alignItems: "center",
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  switchText: { fontSize: 16, color: "#2563eb" },
  switchLink: { color: "#ffcc00", fontWeight: "500" },
});
