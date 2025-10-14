import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroTmc from './IntroTmc';
import LoginScreen from './LoginScreen';
import Onboarding from './Onboarding';
import QuickSearch from './screens/QuickSearch';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="IntroTmc"
        screenOptions={{
          headerShown: false, // hide header for all by default
        }}
      >
        {/* Intro screen */}
        <Stack.Screen name="IntroTmc" component={IntroTmc} />

        {/* Login / Register screen */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />

        {/* Features (Onboarding) screen */}
        <Stack.Screen name="Onboarding" component={Onboarding} />

        {/* Quick Search screen */}
        <Stack.Screen
          name="QuickSearch"
          component={QuickSearch}
          options={{
            headerShown: true, // show title bar for Quick Search only
            title: 'Quick Search',
            headerStyle: {
              backgroundColor: '#0044ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
