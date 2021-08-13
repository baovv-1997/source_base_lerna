module.exports = {
  important: true,
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      sm: { max: '640px' },
      md: { max: '768px' },
      lg: { max: '1024px' },
      xl: { max: '1280px' },
    },
    fontFamily: {},
    extend: {
      colors: {
        primary: '#dd6b20',
        'primary-light': '#f7dbc8',
      },
    },
  },
  variants: {},
  plugins: [],
  // purge: false,
  purge: ['./src/components/**/*.js', './src/pages/**/*.js'],
  mode: 'jit',
};
