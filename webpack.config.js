'use strict';
/* webpack.config.js */

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DIST = 'static/dist/';
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    devtool: false, //devtool: 'eval', // Enable to debug js code
    entry: {
            dist: [
                './src/css/style.scss',
                './src/js/index.js',
            ],

            // 'webgl-worker': './src/earth/worker.js'
            // 'earth': './static/earth/earth.js'

            // dist: './src/css/main.scss',
            // main: './src/js/index.js'
        },
    output: {
        path: path.resolve(__dirname, DIST),
        filename: devMode ? '[name].js' : '[name].[chunkhash].js',
    },
    plugins: [
        new CleanWebpackPlugin([DIST]), // clean folder 'dist'
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
        }),
        new LiveReloadPlugin({})
    ],
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader", // enable eslint
                options: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?[ac]ss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            data: '@import "vars.scss";', // I tried _variables as well
                            includePaths: [path.resolve(__dirname, "src/css")],
                            outputStyle: 'compressed',
                            sourceMap: true,
                            outFile: 'style.css'
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                      loader: 'image-webpack-loader',
                      options: {
                        mozjpeg: {
                          progressive: true,
                          quality: 65
                        },
                        // optipng.enabled: false will disable optipng
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
                        // the webp option will enable WEBP
                        webp: {
                          quality: 75
                        }
                      }
                    },
                ],
            }
        ]
    }
};