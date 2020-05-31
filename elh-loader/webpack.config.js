const path = require('path')

module.exports = {
  mode: 'development',
  entry: './test/src',
  output: {
    path: path.resolve(__dirname, 'test/dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.elh$/, use: [
        'html-loader',
        {
          loader: path.resolve(__dirname, 'index.js'),
          options: {}
        }
      ]}
    ]
  }
}
