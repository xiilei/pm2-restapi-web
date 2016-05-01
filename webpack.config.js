var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var config = {
    context:__dirname+'/public',
    entry:{
        'vendor':['jquery','react','react-dom'],
        'index' :'./entry'
    },
    output:{
            filename: '[name].bundle.js',
            path: __dirname+'/public/build',
            publicPath:'/assets/build/'
    },
    resolve:{
        extensions:["", ".jsx", ".js"],
        alias:{
            'jquery$':'jquery/dist/jquery.min.js',
            'bootstrap.css$':'bootstrap/dist/css/bootstrap.css',
            'react$':'react/dist/react.js',
            'react-dom$':'react-dom/dist/react-dom.js'
        }
    },
    module: {
      loaders: [
        { test: /\.jsx?$/,exclude: /node_modules/,loader: 'babel'},
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
        { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
        { test: /\.(eot|woff|woff2|ttf|svg)$/, loader: "file-loader" }
      ],
      noParse:[/react\/dist\/react\.js/]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].bundle.css"),
        new webpack.optimize.CommonsChunkPlugin('vendor', '[name].bundle.js' )
    ]
};

if(process.env.NODE_ENV == 'production'){
    config.plugins.push(new webpack.DefinePlugin({
                'process.env':{
                    NODE_ENV:'"production"'
                }
    }))
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({compress:{
        warnings: false
    }}));
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}else{
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports= config;
