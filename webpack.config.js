const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const frontConfig = {
    mode: "development",
    target: "web",
    entry: {
      app: ["./frontend/src/main.tsx"]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                        ],
                    },
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
      path: path.resolve(__dirname, "../build"),
      filename: "bundle-front.js",
    },
    devServer: {
      host: '0.0.0.0',
      publicPath: '/assets/',
      contentBase: path.resolve(__dirname, "./views"),
      watchContentBase: true,
      compress: true,
      port: 3000
    },
    devtool: 'inline-source-map',
}

const backConfig = {
    mode: "development",
    target: "node",
    entry: {
      app: ["./backend/src/main.ts"]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },
    output: {
      path: path.resolve(__dirname, "../build"),
      filename: "bundle-back.js"
    },
    plugins: [
        new webpack.IgnorePlugin({
          checkResource(resource) {
            const lazyImports = [
                '@nestjs/microservices',
                'cache-manager',
                '@nestjs/microservices/microservices-module',
                '@nestjs/websockets/socket-module',
                'class-transformer',
                'class-validator',
                'apollo-server-fastify',
            ];
            if (!lazyImports.includes(resource)) {
              return false;
            }
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
            return false;
          },
        }),
      ],
    externals: [nodeExternals()],
}

// Combined 'module.exports'
module.exports = [ frontConfig, backConfig ];