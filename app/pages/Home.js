import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import {Searchbar, ActivityIndicator} from 'react-native-paper';
import React, {useContext, useEffect, useState} from 'react';
import style from '../css/style';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../common/Const';
import {AuthContext} from '../common/AuthContext';

const Home = () => {
  const {store, setStore} = useContext(AuthContext);
  const {cart, setCart} = useContext(AuthContext);
  const navigation = useNavigation();

  const [itemList, setItemList] = useState([]);
  const [itemList2, setItemList2] = useState([]);

  const isDark = useColorScheme() === 'dark';
  console.log(isDark, 'isDark');
  const handleAddToCart = item => {
    if (store.user) {
      item.qty = 1;
      item.orderQty = 1;
      item.amount = item.price;
      if (cart.length == 0) {
        setCart([item]);
      } else {
        let exist = cart.some(a => a._id == item._id);
        if (!exist) {
          setCart([...cart, item]);
        }
      }
    } else {
      navigation.navigate('profile');
    }
  };

  useEffect(() => {
    axios.get(BASE_URL + 'items').then(res => {
      setItemList(res.data);
      setItemList2(res.data);
    });
  }, []);

  const handleSearch = key => {
    let search = key.toString().toLowerCase();
    const result = itemList2.filter(a => {
      return (
        a?.name?.toLowerCase().match(search) ||
        a?.price?.toString()?.toLowerCase().match(search)
      );
    });
    setItemList(result);
  };

  return (
    <View style={isDark ? style.containerDark : style.containerLight}>
      <>
        <>
          <Searchbar
            style={isDark ? style.searchBarDark : style.searchBarLight}
            placeholder="Search"
            onChangeText={e => handleSearch(e)}
          />
          {itemList.length > 0 ? (
            <FlatList
              data={itemList}
              renderItem={({item}) => (
                <View style={isDark ? style.cardDark : style.cardLight}>
                  <Image
                    style={style.logo}
                    source={require('../common/img/food.jpg')}
                  />
                  <Text style={{width: 80, color: isDark ? 'white' : 'black'}}>
                    {item?.name}
                  </Text>
                  <Text style={{color: isDark ? 'white' : 'black'}}>
                    ₹ {item?.price}{' '}
                  </Text>
                  <TouchableOpacity
                    style={style.btn}
                    onPress={() => handleAddToCart(item)}>
                    <Text>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <ActivityIndicator animating={true} />
          )}
        </>
      </>
    </View>
  );
};

export default Home;
