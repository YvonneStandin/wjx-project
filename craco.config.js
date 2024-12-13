// eslint-disable-next-line no-undef
module.exports = {
  //解决跨域mock
  devServer: {
    port: 8000, // B端 前端
    proxy: {
      '/api': 'http://localhost:3001', // Mock
    },
  },
}
