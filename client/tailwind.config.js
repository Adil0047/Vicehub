/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0B0B0B',
          secondary: '#141414',
        },
        card: '#1C1C1C',
        surface: '#242424',
        orange: {
          DEFAULT: '#FF7A00',
          hover: '#FF8F1F',
        },
        success: '#22C55E',
        warning: '#FACC15',
        danger: '#EF4444',
        info: '#3B82F6',
        border: '#333333',
        text: {
          primary: '#FFFFFF',
          secondary: '#C5C5C5',
          muted: '#8A8A8A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        hero: ['60px', { lineHeight: '1.1', fontWeight: '700' }],
        pageTitle: ['42px', { lineHeight: '1.15', fontWeight: '700' }],
        sectionTitle: ['30px', { lineHeight: '1.2', fontWeight: '700' }],
        cardTitle: ['22px', { lineHeight: '1.3', fontWeight: '700' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        btn: '12px',
        card: '16px',
        input: '12px',
        image: '16px',
        modal: '20px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.35)',
        btn: '0 2px 6px rgba(0, 0, 0, 0.25)',
        glow: '0 0 0 3px rgba(255, 122, 0, 0.25)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '250ms',
      },
      screens: {
        sm: '640px',
        md: '1024px',
        lg: '1440px',
      },
    },
  },
  plugins: [],
};
