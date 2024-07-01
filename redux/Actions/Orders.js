import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../app/common/Const';
import {useDispatch, useSelector} from 'react-redux';

// export const getItemList = () => async (dispatch) => {
//   console.log("hello");
//   axios
//     .get(BASE_URL + "items")
//     .then((res) => {
//       dispatch({
//         type: AT_ITEM_LIST,
//         payload: res?.data,
//       });
//     })
//     .catch((err) => {
//       console.log(err, "api err");
//     });
// };

export const getOrderList = createAsyncThunk('getOrderList', async () => {
  console.log('getOrderList called');
  const result = await axios
    .get(BASE_URL + 'userOrders/63d0e3c0d5fb5a7eabae3ab6')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log('err', err);
    });
  return result;
});

export const addOrder = createAsyncThunk('addOrder', async (obj, thunkApi) => {
  console.log(obj, 'obj');
  const result = axios
    .post(BASE_URL + 'addOrder', obj?.data)
    .then(res => {
      if (res.data) {
        console.log('Order placed successfully');
        thunkApi?.dispatch(getOrderList());
        obj?.navigation?.navigate('demo2');
        return res.data;
      } else {
        console.log('error in placing order');
      }
    })
    .catch(err => {
      console.log('err', err);
    });
  return result;
});
