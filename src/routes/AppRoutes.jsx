import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import CustomerLayout from '../layouts/CustomerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Customer Pages
import Home from '../pages/customer/Home';
import ProductCatalog from '../pages/customer/ProductCatalog';
import CategoryPage from '../pages/customer/CategoryPage';
import SearchPage from '../pages/customer/SearchPage';
import ProductDetails from '../pages/customer/ProductDetails';
import Wishlist from '../pages/customer/Wishlist';
import Cart from '../pages/customer/Cart';
import Checkout from '../pages/customer/Checkout';
import OrderSuccess from '../pages/customer/OrderSuccess';
import CustomerOrders from '../pages/customer/CustomerOrders';
import OrderDetails from '../pages/customer/OrderDetails';
import Profile from '../pages/customer/Profile';
import Addresses from '../pages/customer/Addresses';
import Settings from '../pages/customer/Settings';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AdminLogin from '../pages/auth/AdminLogin';
import AdminRegister from '../pages/auth/AdminRegister';

// Route Guards
import AdminRoute from './AdminRoute';
import ProtectedRoute from './ProtectedRoute';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import Products from '../pages/admin/Products';
import AddProduct from '../pages/admin/AddProduct';
import EditProduct from '../pages/admin/EditProduct';
import Categories from '../pages/admin/Categories';
import Orders from '../pages/admin/Orders';
import AdminOrderDetails from '../pages/admin/AdminOrderDetails';
import Customers from '../pages/admin/Customers';
import Inventory from '../pages/admin/Inventory';
import Coupons from '../pages/admin/Coupons';
import Analytics from '../pages/admin/Analytics';
import AdminSettings from '../pages/admin/AdminSettings';

// Common
import ScrollManager from '../components/common/ScrollManager';

// NotFound Page
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        {/* Customer Public & Layout Routes */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Customer Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer Protected Pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<CustomerOrders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/addresses" element={<Addresses />} />
            <Route path="/profile/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Dedicated Admin Auth Routes (Standalone) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Admin Protected Routes Group (Requires Admin Role) */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<AdminOrderDetails />} />
            <Route path="customers" element={<Customers />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* Global 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
