const HtmlWebpack       = require("html-webpack-plugin");
const MiniCssExtract    = require("mini-css-extract-plugin");
const CopyPlugin        = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true
    },

    module:{
        rules:[
            {
                test: /\.html$/,
                loader: 'html-loader',
                options:{
                    sources: false
                }   
            },
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /styles.css$/i,
                use: [MiniCssExtract.loader, "css-loader"],
            },{
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebpack({
            title: 'My Webpack App',
            template: './src/index.html'
        }),
        
        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
              { from: "src/assets", to: "assets/" },
            ],
          }),
    ]
};