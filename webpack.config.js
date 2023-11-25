const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js', // Punto de entrada de tu aplicación
    output: {
        path: path.resolve(__dirname, 'dist'), // Carpeta de salida de los archivos generados
        filename: 'bundle.js' // Nombre del archivo de salida
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Development",
            filename: "index.html",
            template: "src/index.html",
        }),
    ],
    devServer: {
        port: 8020, // Cambia el número de puerto según tu preferencia
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: "asset/resource",
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },

                ]
            },
        ],
    },

};
