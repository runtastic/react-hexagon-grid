const path = require('path');

module.exports = {
  entry: './src/HexagonGrid',
  output: {
    path: path.join(__dirname, 'umd'),
    filename: 'HexagonGrid.js',
    libraryTarget: 'umd',
    library: 'reactHexagonGrid'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /src\/.*\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: { presets: ['es2015', 'react'] }
          }
        ]
      }
    ]
  }
};
