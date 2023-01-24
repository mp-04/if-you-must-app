const path = require("path");
const { SourceMapDevToolPlugin } = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "client", "index.js"),

  output: {
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.?js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "client", "index.html"),
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      "/**": "http://localhost:3000",
    },
  },
};
