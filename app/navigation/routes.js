import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Orders from '../pages/Orders';
import Header from '../pages/Header';
import Cart from '../pages/Cart';
import Footer from '../pages/Footer';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
const stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <Header />
        <stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="home">
          <stack.Screen name="home" component={Home} />
          <stack.Screen name="profile" component={Profile} />
          <stack.Screen name="orders" component={Orders} />
          <stack.Screen name="cart" component={Cart} />
          {/* <stack.Screen name="reels" component={Reels} /> */}
        </stack.Navigator>
        <Footer />
      </NavigationContainer>
    </>
  );
};
export default Routes;
