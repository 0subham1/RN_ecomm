import {View, Text, FlatList, ToastAndroid, useColorScheme} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Button} from 'react-native-paper';
import {AuthContext} from '../common/AuthContext';
import style from '../css/style';
import {BASE_URL} from '../common/Const';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Cart = () => {
  const isDark = useColorScheme() === 'dark';

  const {cart, setCart} = useContext(AuthContext);
  const {store, setStore} = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    handleTotal(cart);
  }, [cart]);

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };

  const handleQty = (key, i) => {
    let obj = [...cart];
    if (key == 'add') {
      obj[i].orderQty = obj[i].orderQty + 1;
    } else if (key == 'sub' && obj[i].orderQty >= 2) {
      obj[i].orderQty = obj[i].orderQty - 1;
    }
    obj[i].amount = obj[i].orderQty * obj[i].price;
    setCart(obj);
    handleTotal(obj);
  };

  const handleClear = i => {
    let obj = [...cart];
    obj.splice(i, 1);
    setCart(obj);
    handleTotal(obj);
  };

  const handleTotal = obj => {
    let sum = 0;
    obj.map(a => {
      sum += a.amount;
    });
    setTotal(sum);
  };

  const handleSave = () => {
    setLoading(true);
    let arr = [...cart];
    arr.map(a => {
      a.qty = a.orderQty;
      a.finalPrice = a.amount;
    });

    let data = {
      itemList: arr,
      userId: store.user._id,
      userName: store.user.name,
      orderDate: new Date(),
      subTotal: total,
      total: total,
      tax: 0,
    };

    axios
      .post(BASE_URL + 'addOrder', data)
      .then(res => {
        if (res.data) {
          setLoading(false);
          toast('Order placed successfully');
          setCart([]);
          navigation.navigate('home');
          setStore({...store, path: 'FoodyWoody'});
        } else {
          setLoading(false);
          toast('error in placing order');
        }
      })
      .catch(err => {
        setLoading(false);
        toast('Bad Request');
      });
  };
  return (
    <View style={isDark ? style.containerDark : style.containerLight}>
      {cart?.length > 0 && (
        <FlatList
          data={cart}
          renderItem={({item, index}) => (
            <View style={isDark ? style.cardDark : style.cardLight}>
              <Text
                style={{
                  width: 80,
                  height: 60,
                  top: 18,
                  color: isDark ? 'white' : 'black',
                }}>
                {item?.name}
              </Text>

              <Entypo
                onPress={() => handleQty('sub', index)}
                name="circle-with-minus"
                size={30}
                color="#87CEFA"
              />
              <Text style={{color: isDark ? 'white' : 'black'}}>
                {item?.orderQty}{' '}
              </Text>

              <Ionicons
                onPress={() => handleQty('add', index)}
                name="add-circle"
                size={30}
                color="#87CEFA"
              />
              <Text
                style={{
                  width: 60,
                  textAlign: 'right',
                  color: isDark ? 'white' : 'black',
                }}>
                ₹ {item?.orderQty * item?.price}{' '}
              </Text>

              <Entypo
                onPress={() => handleClear(index)}
                name="circle-with-cross"
                size={24}
                color={isDark ? 'white' : 'black'}
              />
            </View>
          )}
        />
      )}
      {cart?.length > 0 ? (
        <View style={style.bottomView}>
          <Button onPress={() => setCart([])}>
            <MaterialIcons
              name="remove-shopping-cart"
              size={20}
              color="black"
            />
          </Button>
          <Text>Total: ₹ {total}</Text>
          {!loading && (
            <Button
              style={style.qtybtn}
              onPress={() => handleSave()}
              mode="contained-tonal">
              Order
            </Button>
          )}
          {loading && <ActivityIndicator animating={true} />}
        </View>
      ) : (
        <Text
          style={{
            color: isDark ? 'white' : 'black',
          }}>
          Cart Empty
        </Text>
      )}
    </View>
  );
};

export default Cart;
