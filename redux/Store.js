import {configureStore} from '@reduxjs/toolkit';

import itemReducer from './Slices/Items';

export const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});
