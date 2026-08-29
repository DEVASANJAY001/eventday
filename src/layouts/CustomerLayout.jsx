import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/customer/Navbar';
import Footer from '../components/customer/Footer';

export default function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-surface font-body-md text-on-surface">
      <Navbar />
      <main className="w-full pt-[128px] flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
