import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../app/common/Const';
//   const res = await fetch('https://fakestoreapi.com/products');
//   return  res.json();

export const getItemList = createAsyncThunk('getItemList', async () => {
  let url = BASE_URL + 'items';
  const result = await axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log('err', err);
    });
  return result;
});
