import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import React, {useContext} from 'react';
import style from '../css/style';
import {useNavigation} from '@react-navigation/native';
import {Badge, Button} from 'react-native-paper';
import {AuthContext} from '../common/AuthContext';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Footer = () => {
  const navigation = useNavigation();
  const {store, setStore} = useContext(AuthContext);
  const {cart, setCart} = useContext(AuthContext);
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={isDark ? style.bottomViewDark : style.bottomViewLight}>
      <>
        <Button
          onPress={() => {
            navigation.navigate('home');
            setStore({...store, path: 'FoodyWoody'});
          }}>
          <Ionicons
            style={{color: isDark ? 'white' : 'black'}}
            name="home-outline"
            size={18}
            color="black"
          />
        </Button>

        {/* <Button
          onPress={() => {
            navigation.navigate("reels");
            setStore({ ...store, path: "Reels" });
          }}
        >
          <Foundation name="play-video" size={20} color="black" />{" "}
        </Button> */}

        <Button
          onPress={() => {
            navigation.navigate('profile');
            setStore({...store, path: 'Profile'});
          }}>
          <Ionicons
            style={{color: isDark ? 'white' : 'black'}}
            name="person-outline"
            size={18}
            color="black"
          />
        </Button>
        {store?.user && (
          <Button
            onPress={() => {
              navigation.navigate('orders');
              setStore({...store, path: 'Orders'});
            }}>
            <Ionicons
              style={{color: isDark ? 'white' : 'black'}}
              name="list-circle-outline"
              size={22}
              color="black"
            />
          </Button>
        )}

        <View style={style.row}>
          <Button
            onPress={() => {
              navigation.navigate('cart');
              setStore({...store, path: 'Cart'});
            }}>
            <Ionicons
              style={{color: isDark ? 'white' : 'black'}}
              name="cart-outline"
              size={20}
              color="black"
            />
          </Button>
          <Badge style={style.badge}>{cart?.length}</Badge>
        </View>
      </>
    </View>
  );
};

export default Footer;
