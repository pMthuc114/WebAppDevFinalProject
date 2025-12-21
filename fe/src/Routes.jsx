import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/HomePage/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import BrandProducts from './pages/BrandProducts';
import ProductDetail from './pages/ProductDetail';

import Cart from './pages/Cart';
import OrderForm from './pages/OrderForm';
import MyOrders from './pages/MyOrders';

import AdminAccounts from './pages/admin/AdminAccount';
import ProductManager from './pages/admin/AdminProducts';
import AllOrders from './pages/admin/AdminOrders';
import ChangePassword from './pages/ChangePassword';

import ErrorPage from './pages/Error';

import PrivateRouteRole from './components/PrivateRouteRole';

const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/change-password" element={<ChangePassword />} />

      <Route path="/:brand" element={<BrandProducts />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<OrderForm />} />
      <Route
        path="/my-orders"
        element={
          <PrivateRouteRole>
              <MyOrders />
          </PrivateRouteRole>
      }
/>

      <Route
        path="/admin/accounts"
        element={
          <PrivateRouteRole allowedRoles={['admin']}>
            <AdminAccounts />
          </PrivateRouteRole>
        }
      />
      <Route
        path="/admin/products"
        element={
          <PrivateRouteRole allowedRoles={['admin']}>
            <ProductManager />
          </PrivateRouteRole>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <PrivateRouteRole allowedRoles={['admin']}>
            <AllOrders />
          </PrivateRouteRole>
        }
      />

      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RouteConfig;
