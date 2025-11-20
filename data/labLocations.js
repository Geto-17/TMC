// frontend/data/labLocations.js
import { Linking, Alert } from 'react-native';

// Main Campus - All CL labs share the same coordinates
const MAIN_CAMPUS_COORDS = {
  latitude: 10.0810688,
  longitude: 124.3432912,
};

// Extension Building - Trinidad (Actual coordinates)
const EXTENSION_BUILDING_COORDS = {
  latitude: 10.07817,
  longitude: 124.36516,
};

export const LAB_LOCATIONS = {
  // Main Campus Computer Labs (CL-01 to CL-04)
  "CL-01": {
    name: "Computer Lab 1",
    building: "Main Campus",
    latitude: MAIN_CAMPUS_COORDS.latitude,
    longitude: MAIN_CAMPUS_COORDS.longitude,
  },
  "CL-02": {
    name: "Computer Lab 2",
    building: "Main Campus",
    latitude: MAIN_CAMPUS_COORDS.latitude,
    longitude: MAIN_CAMPUS_COORDS.longitude,
  },
  "CL-03": {
    name: "Computer Lab 3",
    building: "Main Campus",
    latitude: MAIN_CAMPUS_COORDS.latitude,
    longitude: MAIN_CAMPUS_COORDS.longitude,
  },
  "CL-04": {
    name: "Computer Lab 4",
    building: "Main Campus",
    latitude: MAIN_CAMPUS_COORDS.latitude,
    longitude: MAIN_CAMPUS_COORDS.longitude,
  },
  
  // Extension Building Computer Lab - Trinidad
  "EB-CL01": {
    name: "Extension Building - Computer Lab 01",
    building: "Extension Building, Trinidad",
    latitude: EXTENSION_BUILDING_COORDS.latitude,
    longitude: EXTENSION_BUILDING_COORDS.longitude,
  },
};

/**
 * Opens Google Maps with the specified coordinates
 * @param {number} latitude - The latitude coordinate
 * @param {number} longitude - The longitude coordinate
 * @param {string} label - The label/name to show in Maps
 */
export const openGoogleMaps = (latitude, longitude, label) => {
  // Create the Google Maps URL that works on both iOS and Android
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  
  console.log('Opening Google Maps:', url);
  
  // Try to open the URL
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert(
          'Cannot Open Maps',
          'Google Maps is not available on this device.'
        );
      }
    })
    .catch((err) => {
      console.error('Error opening maps:', err);
      Alert.alert(
        'Error',
        'Failed to open Google Maps. Please try again.'
      );
    });
};

/**
 * Check if a room has location data available
 * @param {string} roomCode - The room code (e.g., "CL-01")
 * @returns {boolean} - True if location data exists
 */
export const hasLocation = (roomCode) => {
  return roomCode && LAB_LOCATIONS[roomCode] !== undefined;
};

/**
 * Get location data for a room
 * @param {string} roomCode - The room code (e.g., "CL-01")
 * @returns {object|null} - Location object or null if not found
 */
export const getLocation = (roomCode) => {
  return LAB_LOCATIONS[roomCode] || null;
};