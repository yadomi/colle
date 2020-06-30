const { resolve } = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                target: "es5",
                                module: "es6",
                                // noImplicitAny: true,
                                allowSyntheticDefaultImports: true
                            }
                        }
                    }
                ],
            },
            {
                test: /\.css$/i,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        }
                    }
                ],
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: resolve('./dist'),
    }
}