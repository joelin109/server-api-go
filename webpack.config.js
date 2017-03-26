var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/webapp/index.js',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'index.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};