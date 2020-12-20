module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        server: './server/server.js',
        client: './client/client.js',
    },
    output: {
        filename: '[name]/main.bundle.js'
    },
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif|html|css)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }
            }],
        }],
    },
};