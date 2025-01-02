// eslint-disable-next-line no-undef
module.exports = {
  //解决跨域mock
  devServer: {
    port: 8000, // B端 前端
    proxy: {
      '/api': 'http://localhost:3001', // Mock
    },
  },
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        // 抽离公共代码，只在生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            // antd 和 reactDom 比较大单独抽离，否则会在 vendors-chunk 中
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            // 其它的第三方插件
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        }
      }
      return webpackConfig
    },
  },
}
