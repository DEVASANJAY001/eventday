/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00120f',
          container: '#002a25',
          fixed: '#c2ebe2',
          'fixed-dim': '#a7cec6',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#6d938c',
          fixed: '#00201c',
          'fixed-variant': '#284d47',
        },
        'inverse-primary': '#a7cec6',

        secondary: {
          DEFAULT: '#994700',
          container: '#fb7800',
          fixed: '#ffdbc8',
          'fixed-dim': '#ffb68b',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#592600',
          fixed: '#321200',
          'fixed-variant': '#753400',
        },

        tertiary: {
          DEFAULT: '#00120f',
          container: '#002a25',
          fixed: '#afefe2',
          'fixed-dim': '#94d2c6',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#59968b',
          fixed: '#00201c',
          'fixed-variant': '#065047',
        },

        surface: {
          DEFAULT: '#f7faf9',
          dim: '#d7dbda',
          bright: '#f7faf9',
          variant: '#e0e3e2',
          tint: '#40655f',
          container: {
            lowest: '#ffffff',
            low: '#f1f4f3',
            DEFAULT: '#ebeeed',
            high: '#e6e9e8',
            highest: '#e0e3e2',
          },
        },
        'on-surface': {
          DEFAULT: '#181c1c',
          variant: '#414846',
        },
        'inverse-surface': {
          DEFAULT: '#2d3131',
        },
        'inverse-on-surface': '#eef1f0',

        background: '#f7faf9',
        'on-background': '#181c1c',

        outline: {
          DEFAULT: '#717976',
          variant: '#c0c8c5',
        },

        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#93000a',
        },
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '1.25rem',
        'full': '9999px',
      },
      spacing: {
        'unit': '4px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
        'gutter': '24px',
        'margin-mobile': '16px',
        'margin-desktop': '40px',
        'container-max': '1280px',
        'section-gap': '80px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        headline: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'headline-xl': ['Manrope', 'sans-serif'],
        'headline-lg': ['Manrope', 'sans-serif'],
        'headline-md': ['Manrope', 'sans-serif'],
        'body-lg': ['Plus Jakarta Sans', 'sans-serif'],
        'body-md': ['Plus Jakarta Sans', 'sans-serif'],
        'body-sm': ['Plus Jakarta Sans', 'sans-serif'],
        'label-md': ['Plus Jakarta Sans', 'sans-serif'],
        'label-sm': ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-sm': ['12px', { lineHeight: '14px', fontWeight: '500' }],
      },
      boxShadow: {
        'card-soft': '0px 4px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0px 8px 30px rgba(0, 0, 0, 0.08)',
        'nav-subtle': '0 1px 8px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
