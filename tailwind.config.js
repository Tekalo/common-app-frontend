/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Mirroring: https://www.figma.com/file/CCE0TsuhSMnDb2X0287IXX/%F0%9F%8E%A8-Common-App-Components?node-id=22%3A404&t=KfRuKN24GmEy0KBa-0
    colors: {
      'black-text': '#272929',
      'gray-1': '#6B7281',
      'gray-2': '#9FA4AE',
      'gray-3': '#DBDDE2',
      'gray-4': '#EFF0F2',
      'blue-1': '#317BB5',
      'blue-2': '#2B6796',
      'blue-3': '#245277',
      'blue-4': '#D0E3F2',
      'light-blue': '#F3F9FF',
      'light-orange': '#FFFAF5',
      'red-error': '#D50000',
      'green-success': '#00A870',
      'illustration-black': '#363D3F',
      'illustration-beige': '#FFEACE',
      'illustration-orange': '#FFBC03',
      'illustration-blue': '#16A4F0',
      'illustration-light-blue': '#98D7F8',
      'illustration-green': '#3BB98F',
      'illustration-light-green': '#9ADFC8',
      'illustration-blue-green': '#00A0CC',
      'illustration-mint': '#C4E6F0',
    },
    fontFamily: {
      display: ['Graphik'],
      sans: ['Figtree', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      spacing: {
        // sm Spacing
        '1-sm': '24px',
        '2-sm': '32px',
        '3-sm': '48px',
        '4-sm': '56px',
        '5-sm': '64px',
        '6-sm': '72px',
        '7-sm': '80px',
        '8-sm': '88px',
        '9-sm': '96px',
        '10-sm': '104px',
        '11-sm': '112px',
        // tablet Spacing
        '1-tablet': '32px',
        '2-tablet': '40px',
        '3-tablet': '56px',
        '4-tablet': '64px',
        '5-tablet': '72px',
        '6-tablet': '80px',
        '7-tablet': '88px',
        '8-tablet': '96px',
        '9-tablet': '112px',
        '10-tablet': '120px',
        '11-tablet': '128px',
        // desktop Spacing
        '1-desktop': '40px',
        '2-desktop': '64px',
        '3-desktop': '80px',
        '4-desktop': '96px',
        '5-desktop': '104px',
        '6-desktop': '112px',
        '7-desktop': '120px',
        '8-desktop': '128px',
        '9-desktop': '144px',
        '10-desktop': '152px',
        '11-desktop': '160px',
      },
    },

    fontSize: {
      // Component Typography
      'component-xl': [
        '18px',
        {
          lineHeight: '24px',
          fontWeight: '600',
        },
      ],
      'component-lg': [
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
          lineHeight: '16px',
          letterSpacing: '0.001em',
          fontWeight: '400',
        },
      ],
      'component-sm': [
        '14px',
        {
          lineHeight: '18px',
          letterSpacing: '0.001em',
          fontWeight: '500',
        },
      ],
      'component-xs': [
        '14px',
        {
          lineHeight: '16px',
          letterSpacing: '0.001em',
          fontWeight: '600',
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
      // sm/Tablet Typography
      'sm-md-copy': [
        '16px',
        {
          lineHeight: '26px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'sm-lg-copy': [
        '18px',
        {
          lineHeight: '26px',
          fontWeight: '400',
        },
      ],
      'sm-sm-caption': [
        '12px',
        {
          lineHeight: '16px',
          letterSpacing: '0.05em',
          fontWeight: '500',
        },
      ],
      'sm-lg-caption': [
        '16px',
        {
          lineHeight: '22px',
          letterSpacing: '0.08em',
          fontWeight: '500',
        },
      ],
      'sm-h5': [
        '16px',
        {
          lineHeight: '22px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'sm-h4': [
        '20px',
        {
          lineHeight: '28px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'sm-h3': [
        '32px',
        {
          lineHeight: '46px',
          fontWeight: '500',
        },
      ],
      'sm-h2': [
        '40px',
        {
          lineHeight: '48px',
          fontWeight: '500',
        },
      ],
      'sm-h1': [
        '56px',
        {
          lineHeight: '72px',
          fontWeight: '500',
        },
      ],
    },
  },
};
