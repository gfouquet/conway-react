const path = require('path')

module.exports = {
    entry: path.join(__dirname, './main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        sourceMapFilename: '[name].map'
    },
    devServer: {
        inline: true,
        port: 8181
    },
    devtool: 'source-map',
    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/, // includes js / jsx files
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            { // babel loader for react / es6
                test: /\.(js|jsx)$/, // includes js / jsx files
                exclude: /node_modules/, // excludes npm files
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread', 'transform-runtime']
                }
            }
        ]
    },
    resolve: {
        root: __dirname,
        moduleDirectories: ['node_modules'], // by default, also searches bower files
        extensions: ['', '.js', '.jsx'] // by default, weird extensions + no jsx
    }
}
