// vue.config.js
const path = require('path');

module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 單隻檔案引入
          resources: [
            path.resolve(__dirname, './src/style/main.scss'),
        ],

          // 多檔案引入
        //   resources: ['./path/to/reset.scss', './path/to/mixins.scss']
        })
        .end()
    })
  }
}