module.exports = {
  purge: ['resource/views/**/*.edge'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      margin: ['last'],
      borderWidth: ['last']
    },
  },
  plugins: [],
}
