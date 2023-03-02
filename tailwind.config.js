/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Mirroring: https://www.figma.com/file/CCE0TsuhSMnDb2X0287IXX/%F0%9F%8E%A8-Common-App-Components?node-id=22%3A404&t=KfRuKN24GmEy0KBa-0
    extend: {},
    screens: {
      xs: '320px',
      mobile: '360px',
      tablet: '768px',
      desktop: '1280px',
    },
    fontFamily: {
      display: ['Graphik'],
    },
    fontSize: {
      // Component Typography
      'component-lg': [
        '18px',
        {
          lineHeight: '22px',
          letterSpacing: '0.005em',
          fontWeight: '600',
        },
      ],
      'component-md-header': [
        '18px',
        {
          lineHeight: '22px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'component-md-list': [
        '16px',
        {
          lineHeight: '24px',
          letterSpacing: '0.005em',
          fontWeight: '600',
        },
      ],
      'component-md': [
        '16px',
        {
          lineHeight: '24px',
          letterSpacing: '0.005em',
          fontWeight: '400',
        },
      ],
      'component-sm': [
        '14px',
        {
          lineHeight: '18px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      // Desktop Typography
      'desktop-sm-copy': [
        '16px',
        {
          lineHeight: '20px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'desktop-md-copy': [
        '18px',
        {
          lineHeight: '24px',
          fontWeight: '400',
        },
      ],
      'desktop-lg-copy': [
        '24px',
        {
          lineHeight: '30px',
          fontWeight: '500',
        },
      ],
      'desktop-sm-caption': [
        '14px',
        {
          lineHeight: '18px',
          letterSpacing: '0.006em',
          fontWeight: '500',
        },
      ],
      'desktop-lg-caption': [
        '18px',
        {
          lineHeight: '24px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'desktop-h5': [
        '18px',
        {
          lineHeight: '24px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'desktop-h4': [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '500',
        },
      ],
      'desktop-h3': [
        '32px',
        {
          lineHeight: '42px',
          fontWeight: '500',
        },
      ],
      'desktop-h2': [
        '40px',
        {
          lineHeight: '52px',
          fontWeight: '500',
        },
      ],
      'desktop-h1': [
        '58px',
        {
          lineHeight: '72px',
          fontWeight: '500',
        },
      ],
      // Mobile/Tablet Typography
      'mobile-md-copy': [
        '16px',
        {
          lineHeight: '26px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'mobile-lg-copy': [
        '18px',
        {
          lineHeight: '26px',
          fontWeight: '400',
        },
      ],
      'mobile-sm-caption': [
        '12px',
        {
          lineHeight: '16px',
          letterSpacing: '0.05em',
          fontWeight: '500',
        },
      ],
      'mobile-lg-caption': [
        '16px',
        {
          lineHeight: '22px',
          letterSpacing: '0.08em',
          fontWeight: '500',
        },
      ],
      'mobile-h5': [
        '16px',
        {
          lineHeight: '22px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'mobile-h4': [
        '20px',
        {
          lineHeight: '28px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'mobile-h3': [
        '32px',
        {
          lineHeight: '46px',
          fontWeight: '500',
        },
      ],
      'mobile-h2': [
        '40px',
        {
          lineHeight: '48px',
          fontWeight: '500',
        },
      ],
      'mobile-h1': [
        '56px',
        {
          lineHeight: '72px',
          fontWeight: '500',
        },
      ],
    },
    spacing: {
      // Mobile Spacing
      // Tablet Spacing
      // Desktop Spacing
    },
    colors: {
      'text-black': '#272929',
      'gray-1-darkest': '#6B7281',
      'gray-2-darker': '#9FA4AE',
      'gray-3-dark': '#DBDDE2',
      'gray-4-light': '#EFF0F2',
      'white-global': '#FFFFF',
      'blue-1-primary': '#317BB5',
      'blue-2-hover': '#2B6796',
      'blue-3-pressed': '#245277',
      'blue-4-disabled': '#D0E3F2',
      'light-blue-bg': '#F3F9FF',
      'light-organge-bg': '#FFFAF5',
      'red-error': '#D50000',
      'green-success': '#00A870',
      'orange-warn': '#EB9D00',
    },
  },
  plugins: [],
};
