import React from 'react';
import { MOCK_CATEGORIES } from '../../data/mockProducts';
import Button from '../../components/ui/Button';

export default function Categories() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
            Store Taxonomy & Categories
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Organize catalog groupings, navigation taxonomy, and collection headers.
          </p>
        </div>
        <Button variant="secondary" icon="add">Add Category</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-card-soft space-y-3 relative group hover:shadow-card-hover transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
              </div>
              <span className="text-xs bg-primary-fixed text-primary font-bold px-2.5 py-1 rounded-full">
                {cat.count} Products
              </span>
            </div>

            <div>
              <h3 className="font-headline-md text-headline-md text-primary text-lg">{cat.name}</h3>
              <p className="text-body-sm text-on-surface-variant mt-1">{cat.description}</p>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex gap-3 text-xs">
              <button className="text-secondary font-bold hover:underline">Edit Taxonomy</button>
              <span className="text-outline-variant">•</span>
              <button className="text-primary font-bold hover:underline">View Items</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
