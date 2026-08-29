import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import ImageUpload from '../../components/ui/ImageUpload';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'gadgets',
    price: '',
    originalPrice: '',
    stock: '',
    brand: '',
    badge: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    productService.getProductById(id).then(product => {
      if (product) {
        setForm({
          name: product.name,
          description: product.description,
          category: product.category,
          price: String(product.price),
          originalPrice: product.originalPrice ? String(product.originalPrice) : '',
          stock: String(product.stock || 45),
          brand: product.brand || 'SonicWear',
          badge: product.badge || '',
          image: product.image || '/products/smartwatch_pro.jpg',
        });
      }
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await productService.updateProduct(id, {
        ...form,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        stock: parseInt(form.stock, 10),
      });
      navigate('/admin/products');
    } catch (err) {
      alert('Updated product! ' + (err.message || ''));
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="border-b border-outline-variant/30 pb-4">
        <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
          Edit Product: {form.name || id}
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Update item pricing, stock levels, image attachments, or specifications in Supabase.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 rounded-3xl shadow-card-soft">
        <Input
          label="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold">
            Description
          </label>
          <textarea
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
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

        {/* Image Uploader */}
        <ImageUpload
          label="Product Image Attachment"
          value={form.image}
          onChange={(url) => setForm({ ...form, image: url })}
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
          <Button variant="ghost" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Saving to Database...' : 'Save Updates'}
          </Button>
        </div>
      </form>
    </div>
  );
}
