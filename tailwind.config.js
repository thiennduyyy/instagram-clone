module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  // purge: {
    
  // },
  content: ['./src/**/*.js', './src/**/**/*.js'],
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary')
    }),
    maxWidth: {
      desktop: '51.3125rem',
      header: '58rem'
    },
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98'
      },
      black: {
        light: '#262626',
        primary: "#000",
        faded: '#00000059',
        rgba: 'rgba(0, 0, 0, 0.54)'
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb',
        text: 'rgb(142 142 142)'
      },
      red: {
        primary: '#ed4956'
      },
    },
    extend: {
      height: {
        '95': '95%',
      },
      width: {
        '63p': '63%',
        '58p': '58%',
        '42p': '42%',
      },
      colors: {
        'border-gray': 'rgb(209 213 219)'
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
    }
  }
};
