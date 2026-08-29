import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    sku: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/products');
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
        <p className="text-xs text-gray-500">Create a new catalog entry</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 p-6 rounded">
        <Input
          label="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Description</label>
          <textarea
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
          />
        </div>
        <Select
          label="Category"
          placeholder="Select Category"
          options={[
            { label: 'Men', value: 'men' },
            { label: 'Women', value: 'women' },
            { label: 'Accessories', value: 'accessories' },
          ]}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <Input
          label="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <Input
          label="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <Input
          label="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          required
        />
        
        {/* Simple File Input placeholder */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Product Image</label>
          <input type="file" className="text-xs text-gray-500" />
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="text-xs border rounded px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </div>
  );
}
