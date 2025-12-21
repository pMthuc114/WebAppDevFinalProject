import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.jsx';
import cartReducer from './slices/cartSlice.jsx';

import { authApi } from './apis/authApi.jsx';
import { productApi } from './apis/productApi.jsx';
import { orderApi } from './apis/orderApi.jsx';
import { cartApi } from './apis/cartApi.jsx';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,

    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      cartApi.middleware,
    ),
});