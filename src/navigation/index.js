import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import * as Screen from 'src/screens';
import Drawer from './Drawer'

const Stack = createStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash"
        mode="modal"
        headerMode="none"
      >
        <Stack.Screen name="Splash" component={Screen.Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
