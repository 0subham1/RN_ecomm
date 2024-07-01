const {createSlice} = require('@reduxjs/toolkit');
import {getItemList} from '../Actions/Items';

const itemSlice = createSlice({
  name: 'Items',
  initialState: {
    data: null,
    isLoading: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(getItemList.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getItemList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(getItemList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default itemSlice.reducer;
