// /** @type {import('next').NextConfig} */
// const path = require('path');
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   distDir: 'build',
//   webpack: (config, options) => {
//     config.plugins.push(
//       new options.webpack.container.ModuleFederationPlugin({
//         name:"base",
//         filename: 'static/consumerFile.js',
//         remoteType: "var",
//         remotes: {
//           header: path.resolve("../header/build/remoteEntry.js")
//           // header: "header"

//         },
//         shared: [
//           {
//             react: {
//               eager: true,
//               singleton: true,
//               requiredVersion: false,
//             }
//           },
//           {
//             "react-dom": {
//               eager: true,
//               singleton: true,
//               requiredVersion: false,
//             }
//           },
//         ]
//       })
//     )
//     return config
//   }
// }

// module.exports = nextConfig
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
    const mfConf = {
      name: 'base',
      library: {
        type: config.output.libraryTarget,
        name: 'base',
      },
      remotes: {
        header: 'header',
        audioplayer: 'audioplayer',
      },
      exposes: {},
    };
    config.cache = false;
    withModuleFederation(config, options, mfConf);

    config = customConfig(config);

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
