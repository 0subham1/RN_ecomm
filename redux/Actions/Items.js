import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL3} from '../../app/common/Const';

export const getItemList = createAsyncThunk('getItemList', async () => {
  //   const res = await fetch('https://fakestoreapi.com/products');
  //   return  res.json();
  let url = BASE_URL3 + 'item/itemList';
  console.log(url, 'url');
  const result = await axios
    .get(url)
    .then(res => {
      console.log(res, 'res');
      return res.data;
    })
    .catch(err => {
      console.log('err', err);
    });

  return result;
});
