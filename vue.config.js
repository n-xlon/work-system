const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist',
  assetsDir: './src/assets',
  lintOnSave: true,
  devServer: {
    port: 8081, // 端口号
    host: '0.0.0.0', // 本地和局域网
    // host: 'localhost', // 只有本地
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      '/api': {
        target: 'https://appsrv.yokogawachina.com:8484',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: ['last 7 versions']
          })
        ]
      }
    }
  }
}
