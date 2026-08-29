import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/customer/Navbar';
import Footer from '../components/customer/Footer';

export default function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
