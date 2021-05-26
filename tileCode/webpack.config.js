const path = require("path");
const entryPath = "";

module.exports = {
  entry: {
    app: `./${entryPath}/js/drawPlan.js`,
    drawWalls: `./${entryPath}/js/drawWalls.js`,
    addTile: `./${entryPath}/js/addTile.js`,
    putTiles: `./${entryPath}/js/putTiles.js`,
    calculator: `./${entryPath}/js/calculator.js`,
  },
  output: {
    filename: "[name].out.js",
    path: path.resolve(__dirname, `${entryPath}/build`)
  },
  devServer: {
    contentBase: path.join(__dirname, `${entryPath}`),
    publicPath: "/build/",
    compress: true,
    port: 3001,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "/img/",
          outputPath: "/img/"
        }
      }
    ]
  },
  watch: true
};
