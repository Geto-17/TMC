import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Onboarding({ navigation }) {
  const features = [
    { title: 'Interactive Campus Map', icon: '🗺️' },
    { title: 'Quick Search', icon: '🔍', screen: 'QuickSearch' },
    { title: 'Study Spots', icon: '📚' },
    { title: 'Easy Navigation', icon: '🧭' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TMC CAMPUS GUIDE</Text>
      <Text style={styles.subtitle}>
        Discover everything you need around the campus.
      </Text>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCard}
            onPress={() => {
              if (feature.screen) navigation.navigate(feature.screen);
            }}
          >
            <Text style={styles.icon}>{feature.icon}</Text>
            <Text style={styles.featureText}>{feature.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0044ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffcc00',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  featuresContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    width: '47%',
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 6,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0044ff',
    textAlign: 'center',
  },
});
