var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        "index": './src/webapp/index.js',
        "admin": './src/webapp/admin.js',
        //"vendor": ['react']
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].bundle.js'
    },
    externals: {
        //'react-draft-wysiwyg': 'Editor'
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
    devtool: 'source-map',

    plugins: [
        // 多页面应用，插件自动提取公共代码css/js
       // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ]
};