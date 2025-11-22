import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { API_BASE } from './config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroTmc from './IntroTmc';
import Onboarding from './Onboarding';
import LoginScreen from './LoginScreen';
import Dashboard from './Dashboard';

const Stack = createStackNavigator(); 


export default function App() {
  // Quick connectivity check: ping backend on app start and log result.
  // This is temporary — remove after you've verified connectivity.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE.replace(/\/$/, '')}/ping`);
        const text = await res.text();
        console.log('Ping response from', API_BASE, '=>', text);
      } catch (err) {
        console.error('Ping error to', API_BASE, err.message || err);
      }
    })();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroTmc">
        <Stack.Screen 
          name="IntroTmc" 
          component={IntroTmc}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Onboarding" 
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}