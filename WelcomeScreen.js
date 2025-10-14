import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen({ route }) {
  const { user } = route.params;
  const navigation = useNavigation();

  const handleFeature = (feature) => {
    Alert.alert(feature, `This feature "${feature}" is coming soon!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome, {user.firstName}!</Text>
      <Text style={styles.subtitle}>Username: {user.username}</Text>
      <Text style={styles.subtitle}>School ID: {user.schoolId}</Text>

      <TouchableOpacity style={styles.featureButton} onPress={() => handleFeature('Interactive Campus Map')}>
        <Text style={styles.featureText}>Interactive Campus Map</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureButton} onPress={() => handleFeature('Quick Search')}>
        <Text style={styles.featureText}>Quick Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureButton} onPress={() => handleFeature('Study Spots')}>
        <Text style={styles.featureText}>Study Spots</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureButton} onPress={() => handleFeature('Easy Navigation')}>
        <Text style={styles.featureText}>Easy Navigation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0044ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffcc00',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
  },
});
