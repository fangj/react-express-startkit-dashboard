var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index',
        // vendor: []
    },
    externals: {
        //must require
        'react': 'React',
        'react-dom': 'ReactDOM',
        "prop-types":"PropTypes",
        'history': 'History',
        'react-router': 'ReactRouter',
        'mobx': 'mobx',
        'mobx-react': 'mobxReact',
        //option require
        "alertifyjs":"alertify",
        'antd': 'antd',
        'axios': 'axios',
        'classnames': 'classNames',
        'd3': 'd3',
        'geopattern': 'GeoPattern',
        'jquery': 'jQuery',
        'lodash': '_',
        'parse': 'Parse',
        'pubsub-js': 'PubSub',
        'toastr':'toastr',
        'mockjs': 'Mock',
        'mobx-react-devtools': 'mobxDevtools',
        "recharts":"Recharts",
        "react-transition-group":"ReactTransitionGroup",
        "quill":"Quill",
        "react-quill":"ReactQuill",
        "moment":"moment",
        "markdown-it":"markdownit",
        "mathquill":"MathQuill",
        "math-editor":"MathEditor",
        "katex":"katex",
        "js-quantities":"Qty",
        "g2":"G2",
        "file-saver":"FileSaver",
        'react-jsonschema-form':'JSONSchemaForm',
    },
    output: {
        path: path.join(__dirname, '..', 'server', 'public', 'build'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css']
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                include: path.join(__dirname, 'src'),
                use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        // plugins: ["transform-object-rest-spread"]
                    }
                },
                    {
                        loader: 'awesome-typescript-loader',
                    }

                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            //.css的className 保持原样
                            loader: 'typings-for-css-modules-loader?modules&importLoaders=1&localIdentName=[local]&namedExport&camelCase'
                        }
                    ]
                })
            },
            {
                test: /\.module\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            //antd.less的className 不进行修饰
                            loader: 'typings-for-css-modules-loader?modules&importLoaders=1&localIdentName=[local]&namedExport&camelCase&less!less-loader'
                        }
                    ]
                })
            },
            {
                // test: /\.less$/,
                test(filePath) { //修饰less但不修饰antd_style.less
                    return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
                },
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            //.less的className 进行修饰
                            loader: 'typings-for-css-modules-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&namedExport&camelCase&less!less-loader'
                            // loader: 'typings-for-css-modules-loader?modules&importLoaders=1&localIdentName=[local]&namedExport&camelCase&less!less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: "file-loader?name=[name].[ext]&publicPath=/build/&outputPath=img/"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
        //typings-for-css-modules-loader needs
        new webpack.WatchIgnorePlugin([
            /(less|css)\.d\.ts$/
        ])
    ]
};

//build custom antd css
const { exec } = require('child_process');
exec('lessc --clean-css ./src/themes/custom_antd.module.less ../server/public/build/custom_antd.css ',(err, stdout, stderr) => {
   console.log('built server/public/build/custom_antd.css');
});