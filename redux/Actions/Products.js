import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../app/common/Const';

export const getItemList = createAsyncThunk('getItemList', async () => {
  //   const res = await fetch('https://fakestoreapi.com/products');
  //   const final = await res.json();
  //   return final;
  const result = await axios
    .get(BASE_URL + 'items')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log('err', err);
    });

  return result;
});
