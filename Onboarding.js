import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Onboarding({ navigation }) {
  const features = [
    {
      icon: '📍',
      title: "Interactive Campus Map",
      description: "Easily locate buildings, classrooms, and facilities across the campus.",
      color: '#4CAF50',
    },
    {
      icon: '🔍',
      title: "Quick Search",
      description: "Find faculty, departments, or places instantly with our smart search feature.",
      color: '#2196F3',
    },
    {
      icon: '📚',
      title: "Study Spots",
      description: "Discover the best places around campus to focus and study comfortably.",
      color: '#FF9800',
    },
    {
      icon: '🧭',
      title: "Easy Navigation",
      description: "Get step-by-step directions to anywhere on campus with our GPS-guided routes.",
      color: '#9C27B0',
    },
  ];

  const handleLetGo = () => {
    navigation.replace('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>TMC Campus Guide</Text>
        <Text style={styles.subtitle}>Your all-in-one app for campus life</Text>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => {
            return (
              <View key={index} style={styles.featureCard}>
                <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                  <Text style={styles.iconEmoji}>{feature.icon}</Text>
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            );
          })}
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
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  featuresContainer: {
    marginBottom: 30,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconEmoji: {
    fontSize: 32,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  letGoButton: {
    backgroundColor: '#ffcc00',
    padding: 18,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  letGoButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});