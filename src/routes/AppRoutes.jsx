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

// NotFound Page
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Route Group */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/addresses" element={<Addresses />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>

        {/* Admin Route Group */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/products/new" element={<AddProduct />} />
          <Route path="/admin/products/:id/edit" element={<EditProduct />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/coupons" element={<Coupons />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        {/* Global 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
