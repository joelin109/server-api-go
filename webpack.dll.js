var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        //vendor: [path.join(__dirname, "./www/dll/webpack.dll.vendor.js")],
        vendor_admin: [path.join(__dirname, "./www/dll/webpack.dll.vendor-admin.js")]
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: "[name].dll.js",
        library: "[name]_dll"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "www/dll", "manifest-[name]-dll.json"),
            name: "[name]_dll",
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};