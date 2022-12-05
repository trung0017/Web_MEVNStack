module.exports = {
    configureWebpack: {
        devServer: {
            port: 8080,
            proxy: {
                '/api': {
                    target: 'http://localhost:5000',
                    changeOrigin: true,
                }
            }
        }
    }
}