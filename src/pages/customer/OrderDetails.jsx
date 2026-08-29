import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders, addToCart } = useCart();

  const [order, setOrder] = useState(() => orders.find(o => o.id === id) || null);
  const [loading, setLoading] = useState(!order);
  const [buyAgainToast, setBuyAgainToast] = useState('');

  useEffect(() => {
    // Check if order is already in context
    const localMatch = orders.find(o => o.id === id);
    if (localMatch) {
      setOrder(localMatch);
      setLoading(false);
      return;
    }

    // Fetch from Supabase
    orderService.getUserOrders(user?.id, user?.email).then(fetchedOrders => {
      const match = fetchedOrders.find(o => o.id === id);
      if (match) {
        setOrder(match);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id, orders, user]);

  const handleBuyAgain = (product, color, size) => {
    if (product) {
      addToCart(product, 1, color, size);
      setBuyAgainToast(`${product.name} added to cart!`);
      setTimeout(() => setBuyAgainToast(''), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-container-max mx-auto px-margin-desktop py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-body-sm text-on-surface-variant font-label-md">Loading Order #{id}...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-container-max mx-auto px-margin-desktop py-16">
        <EmptyState
          title="Order Not Found"
          message={`We couldn't locate order reference "${id}". Please check your order ID or purchase history.`}
          ctaText="Back to My Orders"
          onCtaClick={() => navigate('/orders')}
        />
      </div>
    );
  }

  const items = order.items || [];
  const status = order.status || 'Processing';
  const address = order.shippingAddress || {};

  // Stepper stages calculation
  const stages = [
    { title: 'Order Placed', desc: `Confirmed on ${order.date || 'Today'}`, icon: 'task_alt', done: true },
    { title: 'Processing & Packed', desc: 'Verified and packed in warehouse', icon: 'inventory_2', done: status === 'Processing' || status === 'Shipped' || status === 'Delivered' },
    { title: 'Shipped with Courier', desc: 'In transit via PioMart Express', icon: 'local_shipping', done: status === 'Shipped' || status === 'Delivered' },
    { title: 'Delivered', desc: status === 'Delivered' ? 'Delivered to your address' : 'Estimated 3-5 days', icon: 'home', done: status === 'Delivered' },
  ];

  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg gap-gutter">
      {/* Toast Alert */}
      {buyAgainToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-secondary-container">shopping_cart</span>
          <span className="text-xs font-bold">{buyAgainToast}</span>
          <Link to="/cart" className="underline text-xs text-secondary ml-2">View Cart</Link>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm print:hidden">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link to="/orders" className="hover:text-primary transition-colors">My Orders</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">{order.id}</span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
              Order #{order.id}
            </h1>
            <Badge variant={status === 'Delivered' ? 'success' : 'bestseller'}>
              {status}
            </Badge>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Placed on <strong className="text-on-surface">{order.date}</strong> • Paid with <strong className="text-on-surface">{order.paymentMethod || 'Credit Card'}</strong>
          </p>
        </div>

        <div className="flex gap-2 print:hidden">
          <Button variant="outline" size="sm" onClick={handlePrint} icon="print">
            Print Invoice
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/orders')} icon="arrow_back">
            All Orders
          </Button>
        </div>
      </div>

      {/* Visual Tracking Stepper Card */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-card-soft space-y-6">
        <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
          <h2 className="font-headline-md text-base font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">local_shipping</span>
            Live Shipment Tracker
          </h2>
          <span className="text-xs text-on-surface-variant font-mono">
            Tracking No: <strong className="text-primary">PIO-EXP-{order.id.replace(/[^0-9]/g, '') || '924108'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {stages.map((stage, idx) => (
            <div key={idx} className="flex md:flex-col items-start gap-4 md:gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  stage.done
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'bg-surface-container text-on-surface-variant border border-outline-variant/40'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{stage.icon}</span>
              </div>
              <div className="space-y-1">
                <span className={`block font-label-md text-xs font-bold ${stage.done ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {stage.title}
                </span>
                <p className="text-[11px] text-on-surface-variant leading-tight">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Products (2 cols) & Logistics + Financials (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Ordered Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-card-soft space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <h2 className="font-headline-md text-lg text-primary font-bold">
                Purchased Products ({items.length})
              </h2>
              <span className="text-xs text-on-surface-variant">Verified Authentic</span>
            </div>

            <div className="space-y-4">
              {items.map((item, idx) => {
                const product = item.product || item;
                const productId = product.id || item.product_id || 'prod-1';
                const price = Number(product.price || item.product_price || 0);
                const qty = item.quantity || 1;
                const image = product.image || item.product_image || '/products/smartwatch_pro.jpg';
                const name = product.name || item.product_name;

                return (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 hover:border-outline-variant/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <Link to={`/product/${productId}`}>
                        <img
                          src={image}
                          alt={name}
                          className="w-20 h-20 object-cover rounded-xl border border-outline-variant/20 hover:scale-105 transition-transform"
                        />
                      </Link>
                      <div className="space-y-1">
                        <Link
                          to={`/product/${productId}`}
                          className="font-label-md text-sm font-bold text-primary hover:text-secondary transition-colors block"
                        >
                          {name}
                        </Link>
                        <p className="text-xs text-on-surface-variant">
                          Qty: <strong className="text-on-surface">{qty}</strong>
                          {item.selectedColor ? ` • ${item.selectedColor}` : ''}
                          {item.selectedSize ? ` • ${item.selectedSize}` : ''}
                        </p>
                        <p className="font-headline-md text-sm font-bold text-primary">
                          ${price.toFixed(2)} <span className="text-xs text-on-surface-variant font-normal">each</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-outline-variant/20">
                      <span className="font-headline-md text-lg font-bold text-primary">
                        ${(price * qty).toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBuyAgain(product, item.selectedColor, item.selectedSize)}
                        className="text-xs"
                        icon="refresh"
                      >
                        Buy Again
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Address & Payment Breakdown */}
        <div className="space-y-6">
          {/* Shipping Details */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-card-soft space-y-3">
            <h3 className="font-headline-md text-base text-primary font-bold border-b border-outline-variant/20 pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              Delivery Destination
            </h3>
            <div className="text-xs text-on-surface-variant space-y-1">
              <p className="font-bold text-on-surface text-sm">{address.name || 'Deva Sanjay'}</p>
              <p>{address.street || address.address || '42 Tech Boulevard, Suite 100'}</p>
              <p>{address.city || 'Bangalore'}, {address.state || 'Karnataka'} {address.pincode || '560001'}</p>
              <p className="pt-2">Contact: <strong className="text-on-surface">{address.phone || '+91 98765 43210'}</strong></p>
              <p>Email: <strong className="text-on-surface">{address.email || user?.email || 'devasanjay001@gmail.com'}</strong></p>
            </div>
          </div>

          {/* Payment & Invoice Summary */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-card-soft space-y-3">
            <h3 className="font-headline-md text-base text-primary font-bold border-b border-outline-variant/20 pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">receipt</span>
              Invoice Breakdown
            </h3>

            <div className="text-xs text-on-surface-variant space-y-2">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-on-surface">${Number(order.subtotal || order.amount).toFixed(2)}</span>
              </div>

              {Number(order.discountAmount || 0) > 0 && (
                <div className="flex justify-between text-secondary font-semibold">
                  <span>Coupon Discount</span>
                  <span>-${Number(order.discountAmount).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-on-surface">
                  {Number(order.shipping || 0) === 0 ? <span className="text-secondary font-bold">FREE</span> : `$${Number(order.shipping).toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Taxes (8%)</span>
                <span className="font-semibold text-on-surface">${Number(order.tax || 0).toFixed(2)}</span>
              </div>

              <div className="border-t border-outline-variant/30 pt-3 flex justify-between items-center">
                <span className="font-headline-md text-sm text-primary font-bold">Grand Total Paid</span>
                <span className="font-headline-md text-xl text-primary font-bold">${Number(order.amount).toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/20 text-xs text-on-surface-variant flex justify-between">
              <span>Payment Status:</span>
              <Badge variant="success" className="text-[10px]">{order.paymentStatus || 'Paid'}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
