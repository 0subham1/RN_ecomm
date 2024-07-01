import {configureStore} from '@reduxjs/toolkit';

import itemReducer from './Slices/Items';
import orderReducer from './Slices/Orders';

export const store = configureStore({
  reducer: {
    items: itemReducer,
    orders: orderReducer,
  },
});
