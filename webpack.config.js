// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const PugPlugin = require('pug-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: path.join(__dirname, './src/assets/')
};

const PAGES_DIR = `${PATHS.src}/pages/`;
const keepPugFolderStructure = (pathData) => {
    const sourceFile = pathData.filename;                       // => /path/to/src/pages/about.pug
    const relativeFile = path.relative(PAGES_DIR, sourceFile); // => pages/about.pug
    const { dir, name, ext } = path.parse(relativeFile);             // dir: 'pages', name: 'about'
    return `${dir}/${name}.html`;                               // => dist/pages/about.html
};

const entryPugFiles = (dir) => {
    let pugFiles = fs.readdirSync(dir).filter(fileName => fileName.endsWith('.pug'));
    let entryObject = {};

    pugFiles.forEach((fileName) => {
        let file = dir + fileName
        let { name } = path.parse(file);
        entryObject[name] = path.resolve(file)
    });
    return entryObject;
}

const stylesHandler = isProduction
    ? MiniCssExtractPlugin.loader
    : 'style-loader';

const config = {
    target: 'web',
    mode: 'development',
    entry: entryPugFiles(PATHS.src + '/pages/'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'assets/js/[name].js',
        publicPath: '/'
    },
    devServer: {
        open: true,
        host: 'localhost',
        compress: true,
        watchFiles: {
            paths: ['src/**/*.*'],
            options: {
                usePolling: true,
            },
        },
    },
    resolve: {
        alias: {
            Blocks: path.join(PATHS.src, '/blocks/'),
            Components: path.join(PATHS.src, '/components/'),
            Styles: path.join(PATHS.src, '/styles/'),
            Scripts: path.join(PATHS.src, '/scripts/'),
            Images: path.join(PATHS.src, '/images/'),
            Fonts: path.join(PATHS.src, '/fonts/'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new PugPlugin({
            pretty: true,
            extractCss: {
                filename: 'assets/css/[name].css'
            },
            filename: keepPugFolderStructure,
        })


        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(pug)$/,
                loader: PugPlugin.loader
            },
            // {
            //     test: /\.(js|jsx)$/i,
            //     loader: 'babel-loader',
            // },
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

        config.plugins.push(new MiniCssExtractPlugin());
    } else {
        config.mode = 'development';
    }
    return config;
};