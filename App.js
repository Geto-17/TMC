import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroTmc from './IntroTmc';
import Onboarding from './Onboarding';
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.appContainer}>
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
        </Stack.Navigator>
        {/* Added a cleaner status bar look */}
        <StatusBar style="light" backgroundColor="#0044ff" />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#0044ff', // keeps a consistent theme background
  },
});