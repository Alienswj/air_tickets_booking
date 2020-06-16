module.exports = {
    // 修改的配置
    //publicPath: '/',
    devServer: {
        proxy: { // 代理跨域
            '/': { // 代理url关键字 //将target印射为/apis
                target: 'http://localhost:8081', // 需要代理的地址
                changeOrigin: true, // 是否跨域
                pathRewrite: { // 用来做字节更换，比如接口没有api的，那我们前端调用接口用api开头，在这里就把api替换为空，那就和后端结合了，如果不需要那就不加这个
                    '^/': ''
                }
            }
        }
    }
}