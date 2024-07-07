const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const libsFolders = [
    path.resolve(__dirname, 'vendor', 'reveal.js'),
    path.resolve(__dirname, 'vendor', 'q5'),
] // specific paths in case a library is in active maintenance

const isLocalMode = process.env.localMode === 'true'
const isProductionMode = process.env.productionMode === 'true'
console.log('isLocalMode:', isLocalMode)
console.log('isProductionMode:', isProductionMode)
module.exports = {
    mode: isProductionMode ? 'production' : 'development',
    //devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(
                __dirname,
                'src/' + (isLocalMode ? 'index_.html' : 'index.html')
            ),
        }),
        //new BundleAnalyzerPlugin(),
        /* new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }), */
    ],

    entry: {
        bundle: path.join(__dirname, '/src/index.js'),
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: 'bundles/[name].[chunkhash].js',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/dist'),
        },
        port: 7823, // needs to be the same allocated port on the client for hot reloading to work in docker
        hot: true,
        open: true,
        compress: true,
        historyApiFallback: true,
        /* watchOptions: { // if you are on windows, you may need to set this option (regarding docker and inotify events)
            poll: true // Or you can set a value in milliseconds.
          }, */
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg(\+xml)?)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'imgs/[name].[hash][ext]',
                },
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[contenthash][ext]',
                },
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, ...libsFolders],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            vendor: path.resolve(__dirname, 'vendor'),
        },
    },
}
