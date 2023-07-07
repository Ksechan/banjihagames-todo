/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListPage from './App/screens/ListPage';
import EditPage from './App/screens/EditPage';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="list" component={ListPage} />
        <Stack.Screen name="edit" component={EditPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
