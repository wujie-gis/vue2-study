const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',

  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'));

    config.plugin('html').tap(args => {
      args[0].title = 'Vue2基础框架集成';
      return args;
    });

    //生产环境，开启js\css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.(js|css|less)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
        })
      );
    }

    // 配置 webpack 识别 markdown 为普通的文件
    config.module.rule('markdown').test(/\.md$/).use().loader('file-loader').end();
  },

  devServer: {
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro', //mock API接口系统
    //     ws: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/xxx': '', //默认所有请求都加了xxx前缀，需要去掉
    //     },
    //   },
    // },
  },

  lintOnSave: undefined,
};
