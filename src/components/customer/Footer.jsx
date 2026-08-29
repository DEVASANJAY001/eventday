import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-highest mt-section-gap pt-16 pb-8 border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-12">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-stack-md">
            <div className="flex items-center gap-stack-sm">
              <img
                alt="PioMart Logo"
                className="h-6 w-auto grayscale opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY_tHE6AWhYfsMJ88RKo6ouSlLmrU4MXuwKy6IT27I9kDb2_FUFU7j_NH3RfU-Y_QYAbegkRk072LLbCS4MmsOweZ-KkFSOdhT89xdYEVfamILz12VPM3Z2lvlwS43Ko5fE3uCpDd34I6IqpLcOX7dY89rVcVLP_r1LB0vlEGzpXAk1cvmwkf3W6Bv8cAwILxy13aGSHxbmPndV6ZsBIo1Cuyqnr3YagK-N_MQX9wNIpFCgmmaKA"
              />
              <span className="font-headline-md text-headline-md text-on-surface">
                PioMart
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant max-w-xs leading-relaxed">
              Your premium destination for high-quality lifestyle essentials and cutting-edge gadgets.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-stack-sm">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-2">
              Company
            </h4>
            <Link className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/products">
              About Us
            </Link>
            <Link className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/products">
              Find Store
            </Link>
            <Link className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/products">
              Careers
            </Link>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col gap-stack-sm">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-2">
              Support
            </h4>
            <Link className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/orders">
              Customer Support
            </Link>
            <Link className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/orders">
              Shipping Policy
            </Link>
            <Link className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/orders">
              Returns & Exchanges
            </Link>
          </div>

          {/* Column 4: Follow Us */}
          <div className="flex flex-col gap-stack-md">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Share"
                className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button
                type="button"
                aria-label="Website"
                className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">public</span>
              </button>
              <button
                type="button"
                aria-label="Media"
                className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">video_library</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4 text-body-sm text-on-surface-variant">
          <span>© {new Date().getFullYear()} PioMart Retail Corp. All rights reserved.</span>
          <div className="flex gap-6">
            <Link className="hover:text-primary transition-colors" to="/">Privacy Policy</Link>
            <Link className="hover:text-primary transition-colors" to="/">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
