import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-offwhite flex flex-col items-center justify-center text-center p-6 select-none">
      <div className="space-y-6 max-w-md">
        <h1 className="font-serif text-8xl font-bold tracking-widest text-neutral-dark/15">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-neutral-dark">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-neutral-dark/50 leading-relaxed">
            The page you are looking for does not exist or has been relocated to another route path.
          </p>
        </div>
        <div className="pt-4">
          <Button
            variant="secondary"
            className="uppercase tracking-wider text-xs font-bold px-6"
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
