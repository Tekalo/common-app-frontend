/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Mirroring: https://www.figma.com/file/CCE0TsuhSMnDb2X0287IXX/%F0%9F%8E%A8-Common-App-Components?node-id=22%3A404&t=KfRuKN24GmEy0KBa-0
    colors: {
      white: '#FFFFFF',
      'black-text': '#272929',
      'black-transparent': 'rgba(39, 41, 41, 0.7)',
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
      'red-hover': '#A80000',
      'red-active': '#7B0000',
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
    screens: {
      xs: '320px',
      sm: '360px',
      md: '768px',
      lg: '1280px',
      xl: '1880px',
    },
    fontSize: {
      // components
      'component-extra-large': [
        '18px',
        {
          lineHeight: '24px',
          fontWeight: '600',
          letterSpacing: '0.001em',
        },
      ],
      'component-large': [
        '16px',
        {
          lineHeight: '24px',
          letterSpacing: '0.005em',
          fontWeight: '600',
        },
      ],
      'component-medium': [
        '16px',
        {
          lineHeight: '16px',
          letterSpacing: '0.001em',
          fontWeight: '400',
        },
      ],
      'component-small': [
        '14px',
        {
          lineHeight: '18px',
          letterSpacing: '0.001em',
          fontWeight: '500',
        },
      ],
      'component-extra-small': [
        '14px',
        {
          lineHeight: '18px',
          letterSpacing: '0.001em',
          fontWeight: '400',
        },
      ],
      // desktop
      'p3-desktop': [
        '14px',
        {
          lineHeight: '18px',
          letterSpacing: '0.001em',
          fontWeight: '400',
        },
      ],
      'p2-desktop': [
        '18px',
        {
          lineHeight: '26px',
          fontWeight: '400',
          letterSpacing: '0.001em',
        },
      ],
      'p1-desktop': [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '400',
          letterSpacing: '0.001em',
        },
      ],
      'small-caption-desktop': [
        '14px',
        {
          lineHeight: '18px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'large-caption-desktop': [
        '18px',
        {
          lineHeight: '24px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'h4-desktop': [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '500',
        },
      ],
      'h3-desktop': [
        '32px',
        {
          lineHeight: '42px',
          fontWeight: '500',
        },
      ],
      'h2-desktop': [
        '40px',
        {
          lineHeight: '52px',
          fontWeight: '500',
        },
      ],
      'h1-desktop': [
        '58px',
        {
          lineHeight: '72px',
          fontWeight: '500',
        },
      ],
      // mobile
      'p3-mobile': [
        '14px',
        {
          lineHeight: '18px',
          letterSpacing: '0.001em',
          fontWeight: '400',
        },
      ],
      'p2-mobile': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '400',
          letterSpacing: '0.001em',
        },
      ],
      'p1-mobile': [
        '18px',
        {
          lineHeight: '26px',
          fontWeight: '400',
          letterSpacing: '0.001em',
        },
      ],
      'small-caption-mobile': [
        '12px',
        {
          lineHeight: '16px',
          letterSpacing: '0.05em',
          fontWeight: '500',
        },
      ],
      'large-caption-mobile': [
        '16px',
        {
          lineHeight: '22px',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      ],
      'h4-mobile': [
        '20px',
        {
          lineHeight: '28px',
          fontWeight: '500',
        },
      ],
      'h3-mobile': [
        '28px',
        {
          lineHeight: '40px',
          fontWeight: '500',
        },
      ],
      'h2-mobile': [
        '36px',
        {
          lineHeight: '42px',
          fontWeight: '500',
        },
      ],
      'h1-mobile': [
        '42px',
        {
          lineHeight: '52px',
          fontWeight: '500',
        },
      ],
    },

    maxWidth: {
      'content-area': '1120px',
    },
    extend: {
      spacing: {
        px: '1px',
        0: '0px',
        // mobile Spacing
        '1-mobile': '24px',
        '2-mobile': '32px',
        '3-mobile': '40px',
        '4-mobile': '48px',
        '5-mobile': '56px',
        '6-mobile': '64px',
        '7-mobile': '72px',
        '8-mobile': '80px',
        '9-mobile': '88px',
        '10-mobile': '96px',
        '11-mobile': '104px',
        '12-mobile': '112px',
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
        // lg Spacing
        '1-desktop': '40px',
        '2-desktop': '48px',
        '3-desktop': '56px',
        '4-desktop': '64px',
        '5-desktop': '80px',
        '6-desktop': '96px',
        '7-desktop': '104px',
        '8-desktop': '112px',
        '9-desktop': '120px',
        '10-desktop': '128px',
        '11-desktop': '144px',
        '12-desktop': '152px',
        '13-desktop': '160px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
