import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroTmc from './IntroTmc';
import Onboarding from './Onboarding';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';

const Stack = createStackNavigator();


export default function App() {
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
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    
  );
}