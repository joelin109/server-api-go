var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/webapp/app2.js',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'app.bundle2.js'
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