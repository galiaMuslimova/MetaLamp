const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pages = ['index', 'room', 'login', 'signin', 'catalog', 'empty'];
const htmlPlugins = pages.map(fileName => new HTMLWebpackPlugin({  
  template: `pages/${fileName}/${fileName}.pug`,
  filename: `${fileName}.html`,
  favicon: `favicon.jpg`
}));
const uiKit = ['cards', 'colors', 'forms', 'insertions'];
const uiKitHtmlPlugins = uiKit.map(fileName => new HTMLWebpackPlugin({
  template: `ui-kit/${fileName}/${fileName}.pug`,
  filename: `ui-kit/${fileName}.html`
}))

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@c': path.resolve(__dirname, 'src/components/'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ].concat(htmlPlugins).concat(uiKitHtmlPlugins),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        },
          'css-loader',
          'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  }
};

const docs = Object.assign({}, config, {
  name: "docs",
  mode: "development",
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs'),
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  devServer: {
    port: 4000
  }
});

const dist = Object.assign({}, config, {
  name: "dist",
  mode: "production",
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: "MetaLayout",
    libraryTarget: "umd"
  },
});


module.exports = [docs, dist];