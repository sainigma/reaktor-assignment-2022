const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const buildMode = process.env.npm_lifecycle_event;


const devBackendURL = 'localhost:80/'

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
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
}

if (buildMode === 'watch' || !buildMode) {
  console.log("Development mode")
  config.mode = 'development'
  config.module.rules.push(
    {
      test: /\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: '${window.location}',
        replace: `http://${devBackendURL}`
      }
    }
  )
  config.module.rules.push(
    {
      test: /\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: '${window.location.host}',
        replace: 'localhost'
      }
    }
  )
  config.devServer = {
    static: {
      directory: path.resolve(__dirname, 'build')
    },
    compress: false,
    port: 8000,
    proxy: {
      '/rps': {
        target: `http://${devBackendURL}`,
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