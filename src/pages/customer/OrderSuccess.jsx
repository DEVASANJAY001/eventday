import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mx-auto text-primary">
          <span className="material-symbols-outlined text-[36px]">shopping_bag</span>
        </div>
        <h1 className="font-headline-xl text-2xl text-primary font-bold">No Active Order Found</h1>
        <p className="text-body-sm text-on-surface-variant">
          You can view your past purchase history and tracking numbers anytime.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Button onClick={() => navigate('/orders')} variant="primary">
            Go to My Orders
          </Button>
          <Link to="/products">
            <Button variant="outline">Browse Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const items = order.items || [];
  const subtotal = order.subtotal || order.amount || 0;
  const discountAmount = order.discountAmount || 0;
  const shipping = order.shipping || 0;
  const tax = order.tax || 0;
  const grandTotal = order.amount || 0;
  const address = order.shippingAddress || {};

  return (
    <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-8">
      {/* Top Confirmation Hero */}
      <div className="text-center space-y-3 print:hidden">
        <div className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <span className="material-symbols-outlined text-[44px]">verified</span>
        </div>
        <h1 className="font-headline-xl text-3xl text-primary font-bold tracking-tight">
          Payment Successful & Order Confirmed!
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-lg mx-auto">
          Thank you for choosing PioMart. Your order has been placed in our system and is currently being prepared for express delivery.
        </p>
      </div>

      {/* Official Tax Invoice & Order Receipt Card (Print Friendly) */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-10 shadow-card-soft space-y-6">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-outline-variant/30 pb-6">
          <div className="flex items-center gap-3">
            <img
              alt="PioMart Logo"
              className="h-9 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY_tHE6AWhYfsMJ88RKo6ouSlLmrU4MXuwKy6IT27I9kDb2_FUFU7j_NH3RfU-Y_QYAbegkRk072LLbCS4MmsOweZ-KkFSOdhT89xdYEVfamILz12VPM3Z2lvlwS43Ko5fE3uCpDd34I6IqpLcOX7dY89rVcVLP_r1LB0vlEGzpXAk1cvmwkf3W6Bv8cAwILxy13aGSHxbmPndV6ZsBIo1Cuyqnr3YagK-N_MQX9wNIpFCgmmaKA"
            />
            <div>
              <span className="font-headline-md text-xl text-primary font-bold block">PioMart Official Receipt</span>
              <span className="text-[11px] text-on-surface-variant uppercase tracking-wider">Tax Invoice • Express Fulfillment</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <Badge variant="success" className="mb-1 text-xs">
              {order.paymentStatus === 'Paid' ? 'Payment Verified' : 'Order Placed'}
            </Badge>
            <p className="text-xs text-on-surface-variant">Placed on: <strong className="text-on-surface">{order.date || new Date().toISOString().split('T')[0]}</strong></p>
          </div>
        </div>

        {/* Order Reference & Customer Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container-low p-5 rounded-2xl text-xs text-on-surface-variant">
          <div className="space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-primary">Order Reference</span>
            <p className="font-headline-md text-base text-primary font-bold">{order.id}</p>
            <p>Payment Method: <strong className="text-on-surface">{order.paymentMethod || 'Credit Card'}</strong></p>
            <p>Fulfillment Status: <strong className="text-secondary">{order.status || 'Processing'}</strong></p>
          </div>

          <div className="space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-primary">Delivery Address</span>
            <p className="font-bold text-on-surface text-sm">{address.name || 'Deva Sanjay'}</p>
            <p>{address.street || address.address || '42 Tech Boulevard, Suite 100'}</p>
            <p>{address.city || 'Bangalore'}, {address.state || 'Karnataka'} {address.pincode || '560001'}</p>
            <p>Contact Phone: <strong className="text-on-surface">{address.phone || '+91 98765 43210'}</strong></p>
          </div>
        </div>

        {/* Itemized Products Table */}
        <div className="space-y-3">
          <h2 className="font-headline-md text-base font-bold text-primary">
            Ordered Line Items ({items.length})
          </h2>

          <div className="border border-outline-variant/30 rounded-2xl overflow-hidden">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold tracking-wider border-b border-outline-variant/20">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5 text-center">Qty</th>
                  <th className="p-3.5 text-right">Unit Price</th>
                  <th className="p-3.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-on-surface">
                {items.map((item, idx) => {
                  const p = item.product || item;
                  const price = Number(p.price || item.product_price || 0);
                  const qty = item.quantity || 1;
                  return (
                    <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image || p.product_image || '/products/smartwatch_pro.jpg'}
                            alt={p.name || p.product_name}
                            className="w-12 h-12 object-cover rounded-xl border border-outline-variant/20 flex-shrink-0"
                          />
                          <div>
                            <span className="font-label-md text-xs font-bold block">{p.name || p.product_name}</span>
                            <span className="text-[11px] text-on-surface-variant">
                              {item.selectedColor ? `Color: ${item.selectedColor}` : ''}
                              {item.selectedSize ? ` • Size: ${item.selectedSize}` : ''}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-center font-semibold">{qty}</td>
                      <td className="p-3.5 text-right font-medium">${price.toFixed(2)}</td>
                      <td className="p-3.5 text-right font-headline-md font-bold text-primary">
                        ${(price * qty).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Summary Breakdown */}
        <div className="bg-surface-container-low p-5 rounded-2xl space-y-2.5 text-xs text-on-surface-variant">
          <div className="flex justify-between items-center">
            <span>Items Subtotal</span>
            <span className="font-semibold text-on-surface">${Number(subtotal).toFixed(2)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between items-center text-secondary font-semibold">
              <span>Applied Promo Discount</span>
              <span>-${Number(discountAmount).toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span>Estimated Shipping</span>
            <span className="font-semibold text-on-surface">
              {shipping === 0 ? <span className="text-secondary font-bold">FREE</span> : `$${Number(shipping).toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>Estimated Sales Tax (8%)</span>
            <span className="font-semibold text-on-surface">${Number(tax).toFixed(2)}</span>
          </div>

          <div className="border-t border-outline-variant/30 pt-3 flex justify-between items-center">
            <span className="font-headline-md text-base text-primary font-bold">Total Amount Paid</span>
            <span className="font-headline-md text-xl text-primary font-bold">${Number(grandTotal).toFixed(2)}</span>
          </div>
        </div>

        {/* Estimated Delivery Notice */}
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/15 text-xs text-primary">
          <span className="material-symbols-outlined text-[24px]">local_shipping</span>
          <div>
            <p className="font-bold">Estimated Delivery: 3 - 5 Business Days</p>
            <p className="text-[11px] text-on-surface-variant">A tracking link and dispatch notification has been dispatched to {address.email || 'your registered email'}.</p>
          </div>
        </div>

        {/* Action Buttons (Hidden on Print) */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex-1 py-3"
            icon="print"
          >
            Print / Save Receipt
          </Button>

          <Button
            onClick={() => navigate(`/orders/${order.id}`)}
            variant="primary"
            className="flex-1 py-3"
            icon="receipt_long"
          >
            Track Order Status
          </Button>

          <Link to="/products" className="flex-1">
            <Button variant="secondary" className="w-full py-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
