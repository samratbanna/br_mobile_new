const {hairlineWidth} = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        main: '#07988C',
        secondary: '#2E3343',
        header: '#25232F',
        active: 'hsl(var(--active))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#F9F9F9',
        border1: '#EEEEEE',
        border2: '#DFDFDF',
        border3: '#DBDBDB',
        greyTxt: '#373737',
        blue: '#0081F8',
        blue100: '#E9F7FF',
        placeHolder: '#8F8F8F',
        grey: '#646464',
        pink: '#F6406C',
        bg: '#FAFCFE',
        loader: '#E7ECEE',
        offWhite: '#FAFAFA',
        lightBlue: '#ECF6FF',
        lightYellow: '#FFF7D9',
        lightPink: '#FDF2F7',
        purple: '#F9F1FF',
        darkPurple: '#450875',
        lightPurple: '#F0F3FF',
        greennn: '#1BB458',
        graniteGray: '#616161',
        present: '#E4FFE5',
        absent: '#FFE4E4',
        lightOrange: '#FFF7D9',
        leaveColor: '#FAD5A5',
        weekOffColor: '#CF9FFF',
        darkGrey: '#666476',
        lightGrey: '#4E5058',
        green: '#21C545',
        lightGreen: '#E2FFE9',
        yellow: '#FFFF00',
        darkYellow: '#C18B26',
        yellow100: '#FFF2DA',
        greenBorder: '#1B954B',
        green100: '#EFFBF4',
        red: '#EF4C4C',
        reddish: '#E13D27',
        red100: '#FDF2F7',
        orangeLight: '#FFF6EA',
        orange: '#EEA63B',
        excellent: '#DBFFDC',
        good: '#E9F4FF',
        satisfactory: '#FFFADD',
        notSubmitted: '#FFE3DD',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: '#07988C',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem', // 72px
        '8xl': '6rem', // 96px
        '9xl': '8rem', // 128px
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        normal: ['Poppins', 'sans-serif'],
        semibold: ['PoppinsSemiBold', 'sans-serif'],
        medium: ['PoppinsMedium', 'sans-serif'],
        bold: ['PoppinsBold'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
