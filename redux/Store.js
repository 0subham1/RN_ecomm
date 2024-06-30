import {configureStore} from '@reduxjs/toolkit';

import productReducer from './Slices/Products';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
