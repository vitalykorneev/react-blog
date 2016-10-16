module.exports = [
  require('postcss-import'),
  require('autoprefixer')({
    browsers: [
      'last 2 versions',
      'ie 11'
    ]
  }),
  require('postcss-simple-vars')({
    variables: {
      font_basic: 'system, -apple-system, Helvetica, Arial, sans-serif',
      black: '#000000',
      white: '#ffffff',
      red: '#ce0000',
      yellow: '#fae263',
      yellow1: '#ffbc29',
      yellow2: '#faf5d6',
      yellow3: '#fff9e6',
      yellow4: '#ffc107',
      yellow5: '#fffff5',
      blue: '#2567c2',
      blue1: '#4285f4',
      blue2: '#607D8B',
      blue3: '#377eb8',
      blue4: '#3f51b5',
      blue5: '#36474f',
      blue6: '#3267d6',
      blue7: '#009DDC',
      sky: '#3984ee',
      turq: '#009788',
      green: '#008500',
      green1: '#128F15',
      green2: '#4CAF50',
      gray1: 'rgba(0,0,0,0.16)',
      gray2: 'rgba(0,0,0,0.26)',
      gray3: '#2d2d2d',
      gray4: 'rgba(0,0,0,0.46)',
      gray5: '#e5e5e5',
      gray6: '#d6d6d6',
      gray7: '#6C8895',
      gray8: 'rgba(0,0,0,0.1)',
      gray9: '#fafafa',
      purpur: '#a132b3',
      orange: '#ff5722',
      beige1: '#fff9dd',
      beige2: '#fffff5'
    }
  }),
  require('postcss-nested'),
  require('postcss-easings'),
  require('postcss-color-function'),
  require('postcss-flexbugs-fixes'),
  require('postcss-autoreset')({
    reset: {
      boxSizing: 'border-box'
    }
  }),
  require('postcss-mixins')({
    mixins: {
      typo: {
        color: '#000000',
        'font-family': 'system, -apple-system, Helvetica, Arial, sans-serif',
        'font-size': '14px',
        'letter-spacing': '0.025em'
      }
    }
  }),
  // This plugin makes sure we get warnings in the console
  require('postcss-reporter')({
    clearMessages: true
  })
]
