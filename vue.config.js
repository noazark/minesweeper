const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProduction ? 'https://noazark.github.io/minesweeper/' : '/'
}