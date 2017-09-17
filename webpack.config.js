var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    libraryTarget: 'umd',
    library: 'ReactPopoverComponent',
    path: path.resolve('./dist/'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader?' + JSON.stringify({
          configFile: 'tsbuild.json'
        }),
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: process.env.NODE_ENV === 'production' } },
            { loader: 'sass-loader', options: { sourceMap: process.env.NODE_ENV === 'production' } }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.ts', '.tsx']
  },
  externals: [
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-input-mask': {
        root: 'react-input-mask',
        commonjs2: 'react-input-mask',
        commonjs: 'react-input-mask',
        amd: 'react-input-mask'
      }
    },
    {
      'react-onclickoutside': {
        root: 'onClickOutside',
        commonjs2: 'react-onclickoutside',
        commonjs: 'react-onclickoutside',
        amd: 'react-onclickoutside'
      }
    }
  ],
  node: { Buffer: false },
  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
