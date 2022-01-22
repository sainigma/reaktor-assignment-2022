const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const buildMode = process.env.npm_lifecycle_event;

let config = {
  entry: {
    main: ['./src/app.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public/icons", to: "icons"}
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  }
}

if (buildMode === 'watch' || !buildMode) {
  console.log("Development mode")
  config.mode = 'development'
  config.devServer = {
    static: {
      directory: path.resolve(__dirname, 'build')
    },
    compress: false,
    port: 8000,
    proxy: {
      '/reaktor': {
        target: 'http://localhost:8010/',
      },
    }
  }
} else {
  console.log("Production mode")
  config.mode = 'production'
}

module.exports = (env, argv) => {
  return config
}