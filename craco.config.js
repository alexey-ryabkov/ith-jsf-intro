const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // use tsconfig aliases
      webpackConfig.resolve.plugins = [
        ...(webpackConfig.resolve.plugins || []),
        new TsconfigPathsPlugin({
          configFile: './tsconfig.json',
        }),
      ];
      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    // switch off dev-server errors boundry
    devServerConfig.client = {
      ...devServerConfig.client,
      overlay: false,
    };
    return devServerConfig;
  },
};
