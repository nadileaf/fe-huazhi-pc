import { nextui } from '@nextui-org/react';
import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';
import TailwindAnimate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
      hl: '- ',
    },
    extend: {
      colors: {
        // primary: '#FE7938',
        primary: {
          DEFAULT: '#279D9F',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'primary-light': '#FF7109',
        danger: '#EA3F68',
        success: '#39c9a7',
        warning: '#FFB800',
        info: '#7E8A93',
        // background: 'hsl(var(--background))',
        background: '#FAFAFD',
        'background-2': '#F6F9FC',
        'black-333': '#333',
        'black-666': '#666',
        active: '#FFFAEE',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: ['MiSans VF'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  darkMode: ['class', 'class'],
  plugins: [
    plugin(({ matchUtilities, theme, addComponents }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
      addComponents({
        '.list-green-check-mark': {
          listStyle: 'none',
          paddingLeft: '0',
          '> li': {
            position: 'relative',
            marginBottom: '1rem',
            paddingLeft: '16px',
            '&::before': {
              content: "'✓'",
              position: 'absolute',
              left: '0',
              color: '#92C162',
              fontSize: '12px',
            },
          },
        },
        '.wrapper': {
          margin: '0 auto',
          maxWidth: '1280px',
          padding: '0 1rem',
        },
        '.card': {
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
          backgroundColor: 'white',
          borderRadius: '0.4rem',
          padding: '1rem',
          cursor: 'pointer',
          transition: 'all 0.3s',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
        '.card-section': {
          backgroundColor: 'white',
          borderRadius: '0.4rem',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem',
          '&:last-child': {
            marginBottom: '0',
          },
        },
        '.card-section2': {
          backgroundColor: 'white',
          borderRadius: '0.4rem',
          padding: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        },
        '.primary-gradient-button': {
          background: 'linear-gradient(90deg, #279E9E 0%, #25C487 100%)',
          color: 'white !important',
        },
        '.modal-bg': {
          background: 'linear-gradient(180deg, #DEFAF7 0%, #FFFFFF 27%, #FFFFFF 100%);',
        },
        '.shadow-bg': {
          background: 'linear-gradient(180deg, #D9D9D9 0%, rgba(255, 255, 255, 0) 100%)',
          width: '100%',
          height: '40px',
          opacity: '0.25',
        },
        '.shadow-bg-2': {
          background: 'linear-gradient(180deg, #D0D2DE 0%, rgba(255, 255, 255, 0) 100%)',
          width: '100%',
          height: '50px',
          opacity: '0.2',
        },

        '.blue-gradient-button': {
          background: 'linear-gradient(180deg, #FFFFFF 33.5%, #B7E6FC 100%)',
        },
        '.purple-gradient-button': {
          background: 'linear-gradient(180deg, #FFFFFF 20%, #E5E5FF 100%)',
        },
        '.orange-gradient-button': {
          background: 'linear-gradient(180deg, #FFFFFF 20%, #FFEEE5 100%)',
        },
      });
    }),
    nextui({
      addCommonColors: true,
      defaultTheme: 'light',
      layout: {
        radius: {
          small: '0.2rem',
          medium: '0.4rem',
          large: '0.6rem',
        },
        boxShadow: {
          small: '0px 0px 2px 0px rgb(0 0 0 / 0.01), 0px 2px 5px 0px rgb(0 0 0 / 0.06)',
          medium: '0px 0px 4px 0px rgb(0 0 0 / 0.01), 0px 4px 10px 0px rgb(0 0 0 / 0.06)',
          large: '0px 0px 6px 0px rgb(0 0 0 / 0.01), 0px 6px 15px 0px rgb(0 0 0 / 0.06)',
        },
      },
    }),
    TailwindAnimate,
  ],
};
export default config;
