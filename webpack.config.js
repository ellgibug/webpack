const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
console.log('isDev', isDev)

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.jpg'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        },
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/favicon.png'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new MiniCssExtractPugin({
            filename: '[name].[contenthash].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ],
                use: [{
                    loader: MiniCssExtractPugin.loader,
                    options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.csv$/,
                use: [
                    'csv-loader'
                ]
            }
        ]
    }
}