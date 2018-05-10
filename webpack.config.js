const path = require("path")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = (env={}) => {
  console.info(`webpack env: ${JSON.stringify(env)}`)

  return {

    mode: env.production ? "production" : "development",
    context: path.join(__dirname, "./"),
    entry: {
      app: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: "/",
      filename: "[name].bundle.js",
    },
    resolve: {
      alias: {
        "react": "preact-compat",
        "react-dom": "preact-compat",
      },
      extensions: [".js", ".jsx",],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(png|ico|jpe?g|gif)$/i,
          use: [
            "file-loader?name=images/[name].[ext]",
            "image-webpack-loader",
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(["dist", "build", "public",], { verbose: true, }),
      new CompressionPlugin(),
      new HtmlWebpackPlugin({
        inject: "body",
        template: "./src/index.html",
      }),
    ],
  }

}