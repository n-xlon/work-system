const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist',
  assetsDir: './src/assets',
  lintOnSave: true,
  devServer: {
    port: 8082, // 端口号
    host: '0.0.0.0', // 本地和局域网
    https: true,
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'https://appsrv.yokogawachina.com:8585/bpm',
        changeOrigin: true,
        secure: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('config', resolve('./src/config'))
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
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  }
}
