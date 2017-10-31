var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var APP_ROOT = 'frontend';

var plugins = [
    new HtmlWebpackPlugin({template: './'  + '/index.html'})    
    ];


var loaders = [
    
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,loader: 'file-loader?name=fonts/[name].[ext]' }
];

module.exports = {
       context: __dirname + '/frontend',

        entry: {
        app: './app.js'         
        },
        plugins: plugins,
        module : { loaders: loaders},
        output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
        }
};