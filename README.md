安装依赖包： npm install
本地运行：   npm run start

技术组成: es6 + webpack + react + react-redux + react-router + node.js

如何增加业务线模块

（1）: 快速添加 (工程化添加)
    node module.js demo1 demo2 .....
    备注：从demo1 开始 一直到最后 都是需要增加的模块名称， 会创建默认路由 /moduleName（模块名称），如 /demo1 /demo2 .....
    建议： 如果你的模块名称是多个单词的，建议驼峰式书写， 当然你能接受 Hello_world这种创建component命名也是可以的以 hello_world 做模块名称。
