const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: glob.sync('./src/js/**.js').reduce(function(obj, el){
        obj[path.parse(el).name] = el;
        return obj
    },{}),
    output: {
        path: path.resolve(__dirname, './deploy/assets'),
        filename: "[name].js"
    },
    plugins: [
        new MiniCssExtractPlugin(),
      ],
    module: {
        rules : [
            {
                test: /\.s[ac]ss$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "sass-loader",
                ],
              },
        ]
    },
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "src")],
        extensions: ['.js', '.scss']
      }
}