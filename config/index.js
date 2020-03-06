let path = require('path')
module.exports = {
    dev: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        htmlRoot: path.resolve(__dirname, '../dist/index.html')
    },
    prod: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        htmlRoot: path.resolve(__dirname, '../dist/index.html'),
        cssRoot: '../dist/css/[name].[md5:contenthash].min.css',
        assetsSubDirectory: 'static'
    }
}
