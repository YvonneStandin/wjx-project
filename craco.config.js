// eslint-disable-next-line no-undef
module.exports = {
  //解决跨域mock
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
}
