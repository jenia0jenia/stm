"use strict";

const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
const __dist_path = "./static/dist/";

module.exports = {
    devtool: false, //devtool: 'eval', // Enable to debug js code
    entry: {
        dist: ["./src/css/style.scss", "./src/js/index.js"],

        // 'webgl-worker': './src/earth/worker.js'
        // 'earth': './static/earth/earth.js'

        // dist: './src/css/main.scss',
        // main: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, __dist_path),
        filename: isDevelopment ? "[name].js" : "[name].js",
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
            filename: isDevelopment ? "[name].css" : "[name].css",
        //     chunkFilename: isDevelopment ? "[id].css" : "[id].css",
        }),
        new LiveReloadPlugin({}),
        new ESLintPlugin(),
    ],
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     enforce: "pre",
            //     exclude: /node_modules/,
            //     loader: "eslint-loader", // enable eslint
            //     options: {
            //         fix: true
            //     }
            // },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader"
            //     }
            // },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    // {
                    //     loader: "resolve-url-loader",
                    //     options: {
                    //         sourceMap: true
                    //     },
                    // },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                // includePaths: [
                                //     path.resolve(__dirname, "node_modules"),
                                //     path.resolve(__dirname, "src/css"),
                                // ],
                                // url: true,
                                // import: true,
                                //     data: '@import "vars.scss";', // I tried _variables as well
                                //     additionalData: `@import "@/assets/styles/variables/index.scss";`,
                                outFile: "style.css",
                                outputStyle: "compressed",
                            },
                        },
                    },
                ],
            },
            // {
            //     test: /\.(gif|png|jpe?g|svg)$/i,
            //     use: ["file-loader"],
            // },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "src/fonts",
                        },
                    },
                ],
            },
        ],
    },
    stats: {
        children: true,
        errorDetails: true,
    },
    // resolve: {
    //     modules: [
    //         path.resolve(__dirname, "src"),
    //         path.resolve(__dirname, "node_modules"),
    //     ],
    //     alias: {
    //         // Utilities: path.resolve(__dirname, 'src/utilities/'),
    //         // Templates: path.resolve(__dirname, 'src/templates/'),
    //     },
    // },
};
