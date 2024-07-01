import {View, Text, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getItemList} from './Actions/Items';
import {getOrderList, addOrder} from './Actions/Orders';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Demo = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector(state => state.items);
  const orders = useSelector(state => state.orders);
  console.log('items', items);
  console.log('orders', orders);
  let data = {
    itemList: [
      {
        _id: '63e87dfca562a248053ddb3f',
        category: 'SeaFood',
        name: 'chowmin ',
        price: 40,
        __v: 0,
        img: '',
        note: '',
        qty: 1,
        orderQty: 1,
        amount: 40,
        finalPrice: 40,
      },
      {
        _id: '63e87e38a562a248053ddb42',
        category: 'NorthIndian',
        name: 'Biryani',
        price: 50,
        __v: 0,
        img: '',
        note: '',
        qty: 1,
        orderQty: 1,
        amount: 50,
        finalPrice: 50,
      },
    ],
    userId: '63d0e3c0d5fb5a7eabae3ab6',
    userName: 'subham',
    orderDate: new Date(),
    subTotal: 90,
    total: 90,
    tax: 0,
  };

  const handleSetData = async () => {
    await AsyncStorage.setItem('name', 'subham');
    console.warn('data set');
  };
  const handleGetData = async () => {
    const data = await AsyncStorage.getItem('name');
    console.warn(data);
  };
  const handleRemoveData = async () => {
    await AsyncStorage.removeItem('name');
    console.warn('data removed');
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-around',
      }}>
      <Text onPress={() => dispatch(getItemList())}>get Items</Text>
      <Text onPress={() => dispatch(getOrderList())}>get Orders</Text>
      <Text onPress={() => dispatch(addOrder({data, navigation}))}>
        add Orders
      </Text>
      <Button title="setData" onPress={() => handleSetData()} />
      <Button title="getData" onPress={() => handleGetData()} />
      <Button title="remove Data" onPress={() => handleRemoveData()} />
    </View>
  );
};

export default Demo;
