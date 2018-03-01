const path = require('path');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV !== 'production'; // eslint-disable-line no-process-env

module.exports = {
  devtool: isDev && '#cheap-module-eval-source-map',
  entry: isDev ? ['webpack-hot-middleware/client', './demo/demo'] : './demo/demo',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /(src|demo)\/.*\.js$/,
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
