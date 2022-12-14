// /** @type {import('next').NextConfig} */
// const path = require('path');
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   distDir: 'build', // Defined build directory
//   webpack: (config, options) => { // webpack configurations
//     config.entry(path.resolve("src/pages/index.js")); // Set entry point to src/index.tsx
//     config.output.publicPath = "http://localhost:3001/"; // Set public path to http://localhost:3001/
//     config.plugins.push(
//       new options.webpack.container.ModuleFederationPlugin({
//         name:"header",
//         filename: "remoteEntry.js", // remote file name which will used later
//         remoteType: "var",
//         exposes: { // expose all component here.
//           "./header": "./src/components/Header"
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
    const { isServer } = options;
    const mfConf = {
      mergeRuntime: true, //experimental
      name: 'header',
      library: {
        type: config.output.libraryTarget,
        name: 'header',
      },
      filename: 'static/runtime/remoteEntry.js',
      remotes: {},
      exposes: {
        './header': './src/components/header',
      },
    };
    config.cache = false;
    withModuleFederation(config, options, mfConf);

    config = customConfig(config);

    if (!isServer) {
      config.output.publicPath = 'http://localhost:3001/_next/';
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
