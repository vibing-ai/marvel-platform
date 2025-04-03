/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // Enable class-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './templates/**/*.{js,ts,jsx,tsx,mdx}',
    './tools/components/editor/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius, 12px)', // Large radius for rounded corners
        md: 'calc(var(--radius, 12px) - 2px)', // Medium rounded corners
        sm: 'calc(var(--radius, 12px) - 4px)', // Small rounded corners
      },
      colors: {
        background: '#1f2937', // Dark gray background for dark mode
        foreground: '#f9fafb', // Light text for contrast
        card: {
          DEFAULT: '#2d3748', // Card background for components
          foreground: '#edf2f7', // Card text color
        },
        popover: {
          DEFAULT: '#4a5568', // Popover background
          foreground: '#f7fafc', // Popover text
        },
        primary: {
          DEFAULT: '#6b46c1', // Purple as primary accent
          foreground: '#ffffff', // Text on primary
        },
        secondary: {
          DEFAULT: '#4c51bf', // Secondary blue accent
          foreground: '#ffffff', // Text on secondary
        },
        muted: {
          DEFAULT: '#718096', // Muted text color
          foreground: '#e2e8f0', // Muted background
        },
        accent: {
          DEFAULT: '#38b2ac', // Accent teal color
          foreground: '#e6fffa', // Accent text
        },
        destructive: {
          DEFAULT: '#e53e3e', // Red for destructive actions
          foreground: '#fff5f5', // Destructive text
        },
        border: '#2d3748', // Border color for components
        input: '#2a4365', // Input background
        ring: '#805ad5', // Focus ring color
        chart: {
          '1': '#e53e3e',
          '2': '#38b2ac',
          '3': '#3182ce',
          '4': '#ed8936',
          '5': '#d69e2e',
        },
        brand: {
          DEFAULT: '#805ad5', // Brand primary color
          foreground: '#ffffff', // Brand foreground
        },
        highlight: {
          DEFAULT: '#48bb78', // Highlight green
          foreground: '#f0fff4', // Highlight text
        },
      },
      fontFamily: {
        heading: [
          'Inter', // Modern sans-serif font
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI Variable Display',
          'Segoe UI',
          'Helvetica',
          'Apple Color Emoji',
          'Arial',
          'sans-serif',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        mono: [
          'Fira Code', // Monospace font for code
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
        sans: [
          'Inter', // Modern sans-serif font
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI Variable Display',
          'Segoe UI',
          'Helvetica',
          'Apple Color Emoji',
          'Arial',
          'sans-serif',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      screens: {
        '2xl': '1440px', // Larger breakpoints for wide screens
        xl: '1280px',
        lg: '1024px',
        md: '768px',
        sm: '640px',
        xs: '480px',
      },
      boxShadow: {
        editor: '0px 4px 15px rgba(0, 0, 0, 0.5)', // Shadow for editor
        card: '0px 6px 12px rgba(0, 0, 0, 0.2)', // Card shadow
      },
      spacing: {
        72: '18rem', // Custom spacing
        84: '21rem',
        96: '24rem',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwindcss-animate'), // Animations
    // eslint-disable-next-line global-require
    require('tailwind-scrollbar-hide'), // Hide scrollbars
  ],
};
