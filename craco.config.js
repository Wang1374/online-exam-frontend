const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
    webpack: {
        alias: {
            '@': resolve('src')
        }
    },
    devServer(config) {
        config.proxy = {
            '/api': {
                target: "http://localhost:9092",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
        return config
    }
}