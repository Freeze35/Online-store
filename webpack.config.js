const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const  HtmlWebpackPlugin  =  require ( 'html-webpack-plugin' )
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const fs = require('fs');
let nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

const frontConfig = {
    mode: "production",
    entry: ["@babel/polyfill","./client/src/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        publicPath: '/'
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer: {
        //host: 'local-ip',
        //host: '192.168.0.102', // Required for docker
        //allowedHosts: "all",
        port: 3000,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "./dist")
        },
        compress: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "./index.html",
            template: "./client/public/index.html",
            favicon: './client/public/favicon.ico'
        }),

new CleanWebpackPlugin(),
        new Dotenv({
            path: path.resolve(__dirname, './client/.env'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(css|less|sass|scss)$/i,
                use: ["style-loader", "css-loader","less-loader","sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
            },
            {
                test: /\.m?(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets:  [ "@babel/preset-env", ["@babel/preset-react", {"runtime": "automatic"}], ]
                    }
                }
            },
        ],
    },
}
/*const backConfig = {
    mode: "development",
    target: "node",
    entry: ["@babel/polyfill","./server/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "back[name].[hash].js",
    },
    devServer: {
      port:5000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv({
            systemvars: true,
            path: path.resolve(__dirname, './server/.env'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets:  [ "@babel/preset-env" ]
                    }
                }
            }
        ],
    },
    externals:
        ['.js', '.json', 'jsx',"pg", "sqlite3", "pg-hstore",
            {sequelize: "sequelize"},
            {express: 'express'},nodeExternals()],
}*/
module.exports = [frontConfig]