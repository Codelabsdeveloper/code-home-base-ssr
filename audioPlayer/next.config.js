const { withModuleFederation } = require('@module-federation/nextjs-mf');

var customConfig = require('./webpack.custom.js');

const path = require('path');

// Detect build environment
// const env = process.env.NODE_ENV;
// const isDev = env !== 'production';

module.exports = {
  future: { webpack5: true },
  images: {
    domains: [],
  },
  webpack: (config, options) => {
    const { isServer } = options;
    const mfConf = {
      mergeRuntime: true, //experimental
      name: 'audioplayer',
      library: {
        type: config.output.libraryTarget,
        name: 'audioplayer',
      },
      filename: 'static/runtime/remoteEntry.js',
      remotes: {},
      exposes: {
        './audioplayer': './src/components/audioplayer',
      },
    };
    config.cache = false;
    withModuleFederation(config, options, mfConf);

    config = customConfig(config);

    if (!isServer) {
      config.output.publicPath = 'http://localhost:3002/_next/';
    }

    return config;
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]',
              exportLocalsConvention: 'camelCase',
            },
          },
        },
        'resolve-url-loader',
        'sass-loader',
      ],
      include: path.resolve(__dirname, '../src'),
    });

    // Return the altered config
    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
