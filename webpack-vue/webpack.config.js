// 由于webpack是基于Node进行构建的，所以，在webpack的配置文件中，任何合法的Node代码都是支持的
var path = require('path')
// 在内存中，根据指定的模版页面，生成一份内存中的首页，同时自动把打包好的 bundle 注入到页面底部
// 如果要配置插件，需要在导出的对象中，挂载一个 plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin')
// 当以命令行的形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供要打包的文件的入
// 口和出口文件，此时，它会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个配置对象，然后根
// 据这个对象，进行打包构建
module.exports = {
    entry : path.join(__dirname,'/src/main.js'), // 入口文件
    output : {
        path : path.join(__dirname,'./dist'), // 输出路径
        filename : 'bundle.js' // 指定输出文件的名称
    },
    plugins : [ // 所有 webpack 插件的配置节点
        new htmlWebpackPlugin({
            template : path.join(__dirname,'./src/index.html'), // 指定模版文件路径
            filename : 'index.html' // 设置生成的内存页面名称
        })
    ],
    module : { // 配置所有第三方 loader 模块
        rules : [ // 第三方模块的匹配规则
            {test : /\.css$/,use : ['style-loader','css-loader']}, // 处理 CSS 文件的 loader
            {test : /\.(jpg|png|gif|jpeg|bmp)$/,use : 'url-loader?limit=145687&name=[hash:8]-[name].[ext]'},
            // 处理图片路径的 loader
            // limit给定的值，是图片的大小，单位是 byte ，如果我们引用的图片，大于或等于给定的limit值，
            // 则不会被转为base64格式的字符串，如果图片小于给定的limit值，则会被转为base64点字符串
            {test : /\.(ttf|eot|woff|woff2|svg)$/,use : 'url-loader'}, // 处理字体文件的loader
            {test : /\.js$/,use : 'babel-loader',exclude: /node_modules/} // 配置 Babel 来转换高级的ES6语法
        ]
    }
}