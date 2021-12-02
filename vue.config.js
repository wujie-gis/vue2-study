const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const HotHashWebpackPlugin = require('hot-hash-webpack-plugin');
const WebpackBar = require('webpackbar');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',

  // 生产打包时不输出map文件，增加打包速度
  productionSourceMap: false,
  outputDir: 'dist',
  assetsDir: 'assets',

  chainWebpack: config => {
    // vue-cli3.X 会自动进行模块分割抽离，如果不需要进行分割,可以手动删除
    // config.optimization.delete('splitChunks');

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

    // 配置 webpack 识别 markdown 为普通的文件
    config.module.rule('markdown').test(/\.md$/).use().loader('file-loader').end();

    // 生产环境配置
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.(js|css|less)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 删除源文件
        })
      );

      config.output.filename('./js/[name].[chunkhash:8].js');
      config.output.chunkFilename('./js/[name].[chunkhash:8].js');
      config.plugin('extract-css').tap(args => [
        {
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        },
      ]);
      config.plugin('hotHash').use(HotHashWebpackPlugin, [{ version: '1.0.0' }]);
      config.plugin('webpackBar').use(WebpackBar);

      config.optimization
        .minimize(true)
        .minimizer('terser')
        .tap(args => {
          let { terserOptions } = args[0];
          terserOptions.compress.drop_console = true;
          terserOptions.compress.drop_debugger = true;
          return args;
        });

      config.optimization.splitChunks({
        cacheGroups: {
          common: {
            name: 'common',
            chunks: 'all',
            minSize: 1,
            minChunks: 2,
            priority: 1,
          },
          vendor: {
            name: 'chunk-libs',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      });
    }
  },

  devServer: {
    open: true,
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
