const {createSlice} = require('@reduxjs/toolkit');
import {getOrderList, addOrder} from '../Actions/Orders';

const orderSlice = createSlice({
  name: 'Orders',
  initialState: {
    data: null,
    isLoading: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(getOrderList.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getOrderList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(getOrderList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(addOrder.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(addOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default orderSlice.reducer;
