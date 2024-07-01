import {View, Text, FlatList, useColorScheme} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {BASE_URL} from '../common/Const';
import axios from 'axios';
import {AuthContext} from '../common/AuthContext';
import style from '../css/style';
import {Button, Dialog, Portal} from 'react-native-paper';

const Orders = () => {
  const isDark = useColorScheme() === 'dark';

  const {store, setStore} = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [info, setInfo] = React.useState(false);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    if (store?.user?._id) {
      console.log(
        BASE_URL + 'userOrders/' + store?.user?._id,
        'get user order',
      );
      axios
        .get(BASE_URL + 'userOrders/' + store?.user?._id)
        .then(res => {
          setOrders(res.data);
        })
        .catch(err => {
          toast('bad Request');
        });
    }
  }, []);

  return (
    <View style={isDark ? style.containerDark : style.containerLight}>
      <FlatList
        data={orders}
        renderItem={({item, index}) => (
          <View style={isDark ? style.cardDark : style.cardLight}>
            <Button
              onPress={() => {
                setInfo(true);
                setItems(item?.itemList);
              }}>
              <Text style={{color: isDark ? 'white' : 'black'}}>
                {item?.orderId}
              </Text>
            </Button>
            <Text style={{color: isDark ? 'white' : 'black'}}>
              {item?.orderDate.substring(0, 10)}
            </Text>
            <Text
              style={{
                width: 60,
                textAlign: 'right',
                color: isDark ? 'white' : 'black',
              }}>
              ₹ {item?.total}
            </Text>
          </View>
        )}
      />
      <Portal>
        <Dialog
          style={style.white}
          visible={info}
          onDismiss={() => {
            setInfo(false);
            setItems([]);
          }}>
          <Dialog.Title>Items:</Dialog.Title>
          <Dialog.Content>
            <FlatList
              data={items}
              renderItem={({item, index}) => (
                <View style={style.row1}>
                  <Text>
                    {item?.qty} x {item?.name}
                  </Text>
                  <Text>₹ {item?.finalPrice}</Text>
                </View>
              )}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Orders;
