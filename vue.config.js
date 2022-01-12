// const path = require('path')

module.exports = {
  publicPath:'/article/',
  outputDir:'dist/article/',
  assetsDir:'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer:{
    // host: '192.168.1.100',
    port:8092,
    proxy:{
      '/api':{
        target:'http://47.96.231.92:18090',  
        changeOrigin:true, 
        // secure:false
        // 后端接口有匹配项/api所以不用重写地址
        // pathRewrite:{
        //   '^/api':'/'
        // }
      }
    }
  }
}