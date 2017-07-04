var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    devtool: "eval",
    entry: {
        "admin": './src/webapp/admin.js',
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].bundle.js'
    },
    externals: {
        //'react': 'React',
        //'react-dom': 'ReactDOM'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',

    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./www/dll/manifest-vendor_admin-dll.json')
        })
    ]
};