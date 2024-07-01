import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Demo2 from './Demo2';
import Demo from './Demo';

const stack = createNativeStackNavigator();
const Routes2 = () => {
  return (
    <>
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="demo">
          <stack.Screen name="demo" component={Demo} />
          <stack.Screen name="demo2" component={Demo2} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default Routes2;
