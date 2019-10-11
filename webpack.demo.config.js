var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    port: 8080
  },
  entry: [
    './docs/index.tsx'
  ],
  output: {
    path: path.resolve('./docs/'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      'react-popover-component/dist/styles.css': path.resolve('./src/Popover.scss'),
      'react-popover-component/src': path.resolve('./src/'),
      'react-popover-component': path.resolve('./src/Popover.tsx')
    }
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      }
    ]
  },
  node: { Buffer: false },
  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: 'docs/index.ejs',
      inject: 'body'
    })
  ]
}
