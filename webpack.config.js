const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "client", "index.js"),

  output: {
    filename: "bundle.js",
  },
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
  ],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      "/**": "http://localhost:3000",
    },
  },
};
