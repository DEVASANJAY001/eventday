import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { productService } from '../../services/productService';
import EmptyState from '../../components/ui/EmptyState';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders, addToCart } = useCart();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [buyAgainToast, setBuyAgainToast] = useState('');

  useEffect(() => {
    productService.getProducts().then(data => setAllProducts(data || [])).catch(() => {});

    // First check context (fastest)
    const localMatch = orders.find(o => o.id === id);
    if (localMatch) {
      setOrder(localMatch);
      setLoading(false);
      return;
    }

    // Fallback to Supabase
    orderService.getUserOrders(user?.id, user?.email).then(fetchedOrders => {
      const match = fetchedOrders.find(o => o.id === id);
      setOrder(match || null);
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
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop py-16">
        <LoadingSpinner label={`Loading Order #${id}...`} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop py-12">
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
    <div className="flex flex-col w-full max-w-container-max mx-auto px-4 sm:px-6 md:px-margin-desktop py-4 sm:py-8 gap-6">
      {/* Toast Alert */}
      {buyAgainToast && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 bg-primary text-on-primary px-4 sm:px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce text-xs sm:text-sm">
          <span className="material-symbols-outlined text-secondary-container text-[20px]">shopping_cart</span>
          <span className="font-bold">{buyAgainToast}</span>
          <Link to="/cart" className="underline text-secondary ml-1 font-bold">View Cart</Link>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs sm:text-label-sm text-on-surface-variant uppercase tracking-wider print:hidden">
        <Link to="/" className="hover:text-primary transition-colors font-medium">Home</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link to="/orders" className="hover:text-primary transition-colors font-medium">My Orders</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary font-bold">{order.id}</span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <h1 className="font-headline text-xl sm:text-2xl md:text-headline-xl font-bold text-primary tracking-tight">
              Order #{order.id}
            </h1>
            <Badge variant={status === 'Delivered' ? 'success' : 'bestseller'} className="text-[10px] sm:text-xs">
              {status}
            </Badge>
          </div>
          <p className="text-xs sm:text-body-sm text-on-surface-variant mt-1">
            Placed on <strong className="text-on-surface">{order.date}</strong> • Paid with <strong className="text-on-surface">{order.paymentMethod || 'Credit Card'}</strong>
          </p>
        </div>

        <div className="flex gap-2 print:hidden self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={handlePrint} icon="print" className="text-xs">
            Print Receipt
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/orders')} icon="arrow_back" className="text-xs">
            Back
          </Button>
        </div>
      </div>

      {/* Visual Tracking Stepper Card */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-card-soft space-y-4 sm:space-y-6">
        <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3 flex-wrap gap-2">
          <h2 className="font-headline text-sm sm:text-base font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">local_shipping</span>
            Live Shipment Tracker
          </h2>
          <span className="text-[11px] sm:text-xs text-on-surface-variant font-mono">
            Tracking No: <strong className="text-primary">PIO-EXP-{order.id.replace(/[^0-9]/g, '') || '924108'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative">
          {stages.map((stage, idx) => (
            <div key={idx} className="flex md:flex-col items-start gap-3">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  stage.done
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'bg-surface-container text-on-surface-variant border border-outline-variant/40'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">{stage.icon}</span>
              </div>
              <div className="space-y-0.5">
                <span className={`block font-label-md text-xs font-bold ${stage.done ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {stage.title}
                </span>
                <p className="text-[10px] sm:text-[11px] text-on-surface-variant leading-tight">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Products (2 cols) & Logistics + Financials (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Ordered Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-card-soft space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <h2 className="font-headline text-base sm:text-lg text-primary font-bold">
                Items in this Order ({items.length})
              </h2>
              <span className="text-[10px] sm:text-xs text-on-surface-variant font-medium">Verified Genuine</span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {items.map((item, idx) => {
                const targetId = item.product_id || item.product?.id || item.id;
                const matchedProduct = allProducts.find(p => p.id === targetId) || item.product || item;
                const price = Number(matchedProduct.price || item.product_price || 0);
                const qty = item.quantity || 1;
                const image = matchedProduct.image || item.product_image || '/products/smartwatch_pro.jpg';
                const name = matchedProduct.name || item.product_name || 'Product';
                const subtitle = matchedProduct.subtitle || matchedProduct.brand || 'SonicWear';
                const color = item.selectedColor || matchedProduct.colors?.[0]?.name || 'Standard';
                const size = item.selectedSize || matchedProduct.sizes?.[0] || 'Standard';

                return (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 hover:border-outline-variant/40 transition-all"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Link to={`/product/${targetId}`} className="flex-shrink-0 group">
                        <img
                          src={image}
                          alt={name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-outline-variant/30 group-hover:scale-105 transition-transform shadow-sm"
                          onError={(e) => { e.target.src = '/products/smartwatch_pro.jpg'; }}
                        />
                      </Link>
                      <div className="space-y-1">
                        <Link
                          to={`/product/${targetId}`}
                          className="font-label-md text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors block leading-tight"
                        >
                          {name}
                        </Link>
                        <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium">
                          {subtitle}
                        </p>
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-[10px] sm:text-xs text-on-surface-variant">
                          <span className="bg-surface-container px-1.5 sm:px-2 py-0.5 rounded font-semibold text-primary">
                            Color: {color}
                          </span>
                          <span className="bg-surface-container px-1.5 sm:px-2 py-0.5 rounded font-semibold text-primary">
                            Size: {size}
                          </span>
                          <span>
                            Qty: <strong className="text-on-surface">{qty}</strong>
                          </span>
                        </div>
                        <p className="font-headline font-bold text-xs sm:text-sm text-primary pt-0.5">
                          ${price.toFixed(2)} <span className="text-[10px] sm:text-xs text-on-surface-variant font-normal">each</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-outline-variant/15">
                      <span className="font-headline font-bold text-base sm:text-lg text-primary">
                        ${(price * qty).toFixed(2)}
                      </span>
                      <div className="flex gap-1.5 sm:gap-2">
                        <Link to={`/product/${targetId}`}>
                          <Button size="sm" variant="ghost" className="text-xs py-1 px-2.5">
                            View
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleBuyAgain(matchedProduct, color, size)}
                          className="text-xs py-1 px-2.5"
                          icon="refresh"
                        >
                          Buy Again
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Address & Payment Breakdown */}
        <div className="space-y-4 sm:space-y-6">
          {/* Shipping Details */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-card-soft space-y-3">
            <h3 className="font-headline text-sm sm:text-base text-primary font-bold border-b border-outline-variant/20 pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              Delivery Destination
            </h3>
            <div className="text-xs text-on-surface-variant space-y-1">
              <p className="font-bold text-on-surface text-xs sm:text-sm">{address.name || 'Customer'}</p>
              <p>{address.street || address.address || '—'}</p>
              <p>{address.city || ''}{address.state ? `, ${address.state}` : ''} {address.pincode || ''}</p>
              {address.phone && <p className="pt-1">Phone: <strong className="text-on-surface">{address.phone}</strong></p>}
              {address.email && <p>Email: <strong className="text-on-surface">{address.email}</strong></p>}
            </div>
          </div>

          {/* Payment & Invoice Summary */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-card-soft space-y-3">
            <h3 className="font-headline text-sm sm:text-base text-primary font-bold border-b border-outline-variant/20 pb-2 flex items-center gap-2">
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

              <div className="border-t border-outline-variant/30 pt-2.5 flex justify-between items-center">
                <span className="font-headline text-xs sm:text-sm text-primary font-bold">Total Paid</span>
                <span className="font-headline text-lg sm:text-xl text-primary font-bold">${Number(order.amount).toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/20 text-xs text-on-surface-variant flex justify-between items-center">
              <span>Payment:</span>
              <Badge variant="success" className="text-[10px]">{order.paymentStatus || 'Paid'}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
