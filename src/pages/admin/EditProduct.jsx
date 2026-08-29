import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];

  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    stock: product.stock || 45,
    brand: product.brand || 'SonicWear',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Product changes saved successfully!');
    navigate('/admin/products');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Edit Product: {product.name}
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Update item pricing, stock levels, or specifications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 rounded-2xl shadow-card-soft">
        <Input
          label="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Description
          </label>
          <textarea
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Category"
            options={[
              { label: 'Gadgets & Electronics', value: 'gadgets' },
              { label: 'Women Fashion', value: 'women' },
              { label: 'Men Fashion', value: 'men' },
              { label: 'Home & Living', value: 'home' },
            ]}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />

          <Input
            label="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Price ($)"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <Input
            label="Available Stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
          <Button variant="ghost" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Updates
          </Button>
        </div>
      </form>
    </div>
  );
}
