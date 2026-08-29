import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center p-6 select-none">
      <div className="space-y-6 max-w-md bg-surface-container-lowest p-10 rounded-3xl shadow-card-soft border border-outline-variant/30">
        <h1 className="font-headline text-8xl font-bold tracking-widest text-primary/20">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="font-headline text-2xl font-bold text-primary">
            Page Not Found
          </h2>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            The page you are looking for does not exist or has been relocated to another route path.
          </p>
        </div>
        <div className="pt-4 flex gap-3 justify-center">
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            icon="home"
          >
            Return Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/products')}
            icon="explore"
          >
            Browse Products
          </Button>
        </div>
      </div>
    </div>
  );
}
