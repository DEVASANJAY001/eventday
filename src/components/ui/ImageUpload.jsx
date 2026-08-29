import React, { useState, useRef } from 'react';
import { productService } from '../../services/productService';

export default function ImageUpload({ value, onChange, label = "Product Image" }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await productService.uploadProductImage(file);
      onChange(url);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Failed to process image: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await productService.uploadProductImage(file);
      onChange(url);
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold block">
        {label}
      </label>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? 'border-primary bg-primary/5'
            : value
            ? 'border-outline-variant/50 bg-surface-container-low/40'
            : 'border-outline-variant/70 hover:border-primary bg-surface-container-low hover:bg-surface-container'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {uploading ? (
          <div className="py-4 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-primary font-bold">Uploading image to database...</span>
          </div>
        ) : value ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <img
              src={value}
              alt="Uploaded Preview"
              className="w-24 h-24 object-cover rounded-2xl border border-outline-variant/40 shadow-sm"
            />
            <div className="text-left space-y-1">
              <span className="inline-block bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                Image Attached
              </span>
              <p className="text-xs text-on-surface-variant truncate max-w-xs">{value}</p>
              <p className="text-[11px] text-secondary font-bold">Click or drop new file to replace</p>
            </div>
          </div>
        ) : (
          <div className="py-3 flex flex-col items-center justify-center gap-2 text-on-surface-variant">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[26px]">cloud_upload</span>
            </div>
            <div>
              <p className="text-xs font-bold text-primary">
                Click to browse or drag & drop product photo
              </p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                Supports JPG, PNG, WebP up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Direct URL input option */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-[11px] text-on-surface-variant whitespace-nowrap">Or Image URL:</span>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/products/smartwatch_pro.jpg or https://..."
          className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}
