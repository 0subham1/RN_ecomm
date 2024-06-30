import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getItemList} from './redux/Actions/Products';

const Demo = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state);
  console.log('prod', products);
  let data = 'hello world';
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text>Demo</Text>
      <TouchableOpacity style={{margin: 20}}>
        <Text onPress={() => dispatch(getItemList(data))}>call prod</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Demo;
