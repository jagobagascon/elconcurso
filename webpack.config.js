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
        rules: [
            // files
            {
                test: /\.(png|jpe?g|gif|html)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                }],
            },
            // css
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        
        ],
    },
};