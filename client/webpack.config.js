const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
  const loaders = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDev,       //hot module replacement
      reloadAll: true
    },
  }, 'css-loader']

  if (extra) {
    loaders.push(extra)
  }

  return loaders;
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetPlugin(), //minify css
      new TerserPlugin()            //minify js
    ]
  }

  return config;
}

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env', //universal main preset
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ]
  }

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
}

const jsLoaders = () => {
  console.log(path.resolve())
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
}


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'], //'@babel/polyfill' for working babel
    // analytics: './analytics.ts'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/'
  },
  devServer: {
    port: 5005,
    historyApiFallback: true, //switch on routes
    // contentBase:'/home/rdn/Documents/Op/mustHave/bh',
    // contentBase:path.resolve(), //for static files
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],//in order to write imports without dots.ext
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@public': path.resolve(__dirname, 'src', 'public'),
      '@server': path.resolve()
    }
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new webpack.ProvidePlugin({
      // $: 'jquery',
      // jQuery: 'jquery',
      CodeMirror: 'codemirror',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/images/logo.png'),
          to: path.resolve(__dirname, 'dist/public/images')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/header-slider/pic1.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/header-slider')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/header-slider/pic2.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/header-slider')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/header-slider/pic3.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/header-slider')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/main-slider/pic1.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/main-slider')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/main-slider/pic2.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/main-slider')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/main-slider/pic3.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/main-slider')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/main-slider/pic4.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/main-slider')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/main-slider/pic5.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/main-slider')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/main-slider/pic6.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/main-slider')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/main-slider/pic7.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/main-slider')
        },
        {
          from: path.resolve(__dirname, 'src/public/images/main-slider/pic8.jpg'),
          to: path.resolve(__dirname, 'dist/public/images/main-slider')
        },
      ]
    }),
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  optimization: optimization(), //in order to not make two layers of the same code(i.e. jquery)
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      },
      {
        test: /\.css$/i,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        }
        // use: {
        //   loader: "url-loader",
        //   options: {
        //     limit: 25000,
        //   },
        // }
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'font',
            },
          },
        ],
      }
    ]
  }
}
