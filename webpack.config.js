'use strict';
/* webpack.config.js */

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const DIST = 'static/dist/';
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
                test: /\.js$/,
                enforce: "pre",
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
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'resolve-url-loader',
                        options: {}
                    }, 
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [
                                    path.resolve(__dirname, 'node_modules'),
                                    path.resolve(__dirname, "src/css"),
                                ],
                                data: '@import "vars.scss";', // I tried _variables as well
                                additionalData: `@import "@/assets/styles/variables/index.scss";`,
                                url: true,
                                import: true,
                                sourceMap: true,
                                outFile: 'style.css',
                                outputStyle: "compressed",
                            },

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
                          quality: [0.65, 0.90],
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
            },
            {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'src/fonts'
                        }
                    }
                ]
            }
        ]
    },
    stats: {
        children: true,
        errorDetails: true
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
            // Utilities: path.resolve(__dirname, 'src/utilities/'),
            // Templates: path.resolve(__dirname, 'src/templates/'),
        },
    },
};