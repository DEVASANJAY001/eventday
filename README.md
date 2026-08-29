# Veyora – Half-Built E-Commerce Starter Project

Welcome to the **Veyora E-Commerce** starter template for the DevStorm Hackathon! 

This codebase is a visually complete, premium, responsive frontend-only React + Vite + Tailwind CSS application. It is designed to look like a high-end designer retail brand, but is functionally empty (zero database connections, zero authentication states, and zero localStorage persistence).

---

## ⚡ Hackathon Round Overview

1. **Round 1 — UI Refinements & Styling**: Extend or modify components, customize branding themes, and adjust responsive pages.
2. **Round 2 — Google Authentication**: Integrate Google OAuth (or similar logins) using the structured routing folders separated between customer settings and admin pages.
3. **Round 3 — Supabase Integration & Hosting**: Hook up database queries, replace dummy states with live tables, handle shopping cart additions, and deploy on hosting environments like Vercel or Netlify.

---

## 🛠️ Tech Stack & Setup

- **Core Framework**: React (functional components only)
- **Bundler & Server**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router (v6+)

### Project Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the hot-reloading development server:
   ```bash
   npm run dev
   ```
3. Compile production builds:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

The project conforms strictly to the authoritative organization layout:

```text
src/
  components/
    ui/          # Reusable layout primitives (Buttons, Inputs, Modals, Badges)
    customer/    # Customer view UI blocks (Navbar, Footer, ProductCards)
    admin/       # Admin utilities (Sidebar, ImageUploader, Header)
  layouts/       # Route-level wrappers (CustomerLayout, AdminLayout)
  pages/
    customer/    # Customer pages (Home, Catalog, Details, Wishlist, Cart, Profile)
    admin/       # Administrative management screens (Dashboard, Products, Orders)
  routes/        # Router bindings (AppRoutes.jsx)
  hooks/         # Custom state/hooks helpers
  utils/         # Types documentation (types.js)
  assets/        # Styles and static image assets
```

---

## 🔗 Integration Checkpoints (Round 3 Reference)

To bind Supabase and live CRUD workflows, target these files:
- **Product Catalog Queries**: Replace the empty `products = []` state in [`ProductCatalog.jsx`](file:///c:/Users/Lenovo/Downloads/DEVSTROM-ECOM-WEBAPP/src/pages/customer/ProductCatalog.jsx) with a database query.
- **Product Details Page**: Replace the null `product = null` pointer in [`ProductDetails.jsx`](file:///c:/Users/Lenovo/Downloads/DEVSTROM-ECOM-WEBAPP/src/pages/customer/ProductDetails.jsx) with a dynamic fetch matching the `:id` parameter.
- **Cart/Checkout Workflows**: Hook up the Cart context and update totals on checkout submissions in [`Cart.jsx`](file:///c:/Users/Lenovo/Downloads/DEVSTROM-ECOM-WEBAPP/src/pages/customer/Cart.jsx) and [`Checkout.jsx`](file:///c:/Users/Lenovo/Downloads/DEVSTROM-ECOM-WEBAPP/src/pages/customer/Checkout.jsx).
- **Admin Dashboard Statistics**: Link real-time aggregations (such as counting orders and sales sum) inside [`Dashboard.jsx`](file:///c:/Users/Lenovo/Downloads/DEVSTROM-ECOM-WEBAPP/src/pages/admin/Dashboard.jsx) and [`Analytics.jsx`](file:///c:/Users/Lenovo/Downloads/DEVSTROM-ECOM-WEBAPP/src/pages/admin/Analytics.jsx).
