const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   optimization: {
      minimizer: [
         new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
               preset: ['default', { discardComments: { removeAll: true } }],
            }
         })
      ]
   },
   plugins: [
      new MiniCSSExtractPlugin({
         filename: "style.css",
      }),
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: 'src/index.html'
      })
   ],
   module: {
      rules: [
         {
            test: /\.css$/,
            loader: [
               MiniCSSExtractPlugin.loader,
               "css-loader"
            ]
         },
         {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: './images'
                  },
               },
               {
                  loader: 'image-webpack-loader',
                  options: {
                     mozjpeg: {
                        progressive: true,
                        quality: 70
                     },
                     optipng: {
                        enabled: false,
                     },
                     pngquant: {
                        quality: '65-90',
                        speed: 4
                     },
                     gifsicle: {
                        interlaced: false,
                     },
                     webp: {
                        quality: 75
                     }
                  }
               }
            ]
         },
         {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: './fonts'
                  },
               }
            ]
         }
      ]
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.js'
   },
   entry: {
      main: './src/js/index.js'
   }
}