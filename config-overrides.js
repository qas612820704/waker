const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  webpack(config, env) {
    if (env === 'production') {
      // remove workbox
      config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'GenerateSW');
    }

    config.plugins.push(
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/service-worker.js'),
      }),
    );

    return config;
  }
}
