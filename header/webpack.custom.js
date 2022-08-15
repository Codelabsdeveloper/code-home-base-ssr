module.exports = (config) => {
  // Load images, icons and custom file extensions
  config.module.rules.push({
    test: /\.(ico|png|jp(e)g|webp|woff|woff2)$/,
    issuer: /\.(js|jsx)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 3000,
        fallback: 'file-loader',
        publicPath: '/_next/static/media/',
        outputPath: '../static/media/',
        name: '[name].[hash].[ext]',
      },
    },
  });

  // // Special treatment to inline svg icons and images loaded in js & jsx
  // // Svg icons in scss will be automatically handled by css modules
  config.module.rules.push({
    test: /\.(svg)$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [{ cleanupIDs: true }],
          },
        },
      },
    ],
  });

  return config;
};
