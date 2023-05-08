const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin  =  require ( 'html-webpack-plugin' )
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const apiMocker = require("mocker-api");


const filesThreshold = 8196; // (bytes) threshold for compression, url-loader plugins


const frontConfig = {
    mode: "production",
    entry: ["core-js/modules/es.promise", "core-js/modules/es.array.iterator","./src/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        clean: true,
        publicPath: '/'
    },
    devServer: {
        //host: 'local-ip',
        //host: '192.168.0.102', // Required for docker
        //allowedHosts: "all",
        //contentBase: './dist'
        port: 3000,
        hot: true,
        historyApiFallback: true,
        compress: true,
        onBeforeSetupMiddleware(api){
            apiMocker(api.app, path.resolve('./mocker/api.js'))
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new InterpolateHtmlPlugin({
            PUBLIC_URL: 'static' // can modify `static` to another name or get it from `process`
        }),
        new HtmlWebpackPlugin({
            filename: "./index.html",
            template: "./public/index.html",
            favicon: './public/favicon.ico',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
        new CleanWebpackPlugin(),
        new Dotenv({
            path: path.resolve(__dirname, './.env'),
        }),
        new CompressionPlugin({
            // optional: it creates gzipped (compressed) files in '[path].gz[query]'
            threshold: filesThreshold, // (bytes). Only assets bigger than this size are processed
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/other"},
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader", // transpile *.js, *.jsx, *.ts, *.tsx to result according to .browserlistrc and babel.config.js files
                    {
                        loader: "babel-loader", // transpile *.ts to *.js, despite babel-loader deals with typeScript without restrictions but doesn't have .browserlist support
                        options: {
                            presets: [
                                "@babel/preset-env",
                                ["@babel/preset-react", {"runtime": "automatic"}],
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                    // optional: "ifdef-loader" // prodives conditinal compilation: https://github.com/nippur72/ifdef-loader
                    // optional: "eslint-loader" //provides lint-errors into wepback output
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/i,
                type: 'asset/resource',
            },
            // rule for ts, tsx files
            {
                test: /\.(css|less|sass|scss)$/i,
                use: ["style-loader", "css-loader","less-loader","sass-loader"],
            },
            {
                test: /\.(png|jp(e*)g|gif|ico)$/,
                use: [
                    {
                        loader: "file-loader",
                        // options: {
                        //   name: "images/[hash]-[name].[ext]",
                        // },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'async',
        },
        concatenateModules: true,
        minimizer: [
            new TerserPlugin({
                // default webpack plugin for js-optimization
                test: /\.m?js(\?.*)?$/i,
                // exclude: /\.m?js(\?.*)?$/i, // uncomment if we don't need uglifying (for debug purpose)
                extractComments: false, // disable extracting comments to a different file
                terserOptions: {
                    toplevel: true, // https://github.com/terser/terser#minify-options
                    parse: {
                        ecma: 2018,
                    },
                    compress: {
                        ecma: 5,
                        comparisons: false,
                        inline: 2,
                    },
                    output: {
                        comments: false, // remove comments from files
                    },
                    mangle: {
                        safari10: true, // for preventing Safari 10/11 bugs in loop scoping and await
                    },
                    keep_classnames: false,
                    keep_fnames: false,
                },
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            ["svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                    addAttributesToSVGElement: {
                                                        params: {
                                                            attributes: [
                                                                { xmlns: "http://www.w3.org/2000/svg" },
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
            new CssMinimizerPlugin({}),
        ],
    },
    resolve: {
        extensions: ['.js','.jsx', '.json','.ts', '.tsx'],
    },
}
module.exports = [frontConfig]