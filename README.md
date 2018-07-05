npm install
npm run start

http://localhost:9010/omega/home



如何增加业务线模块

（1）: 快速添加 (工程化添加)
    node module.js demo1 demo2 .....
    备注：从demo1 开始 一直到最后 都是需要增加的模块名称， 会创建默认路由 /moduleName（模块名称），如 /demo1 /demo2 .....
    建议： 如果你的模块名称是多个单词的，建议驼峰式书写， 当然你能接受 Hello_world这种创建component命名也是可以的以 hello_world 做模块名称。
（2）: 手动创建模块需要增加和修改的地方 （以demo为:chestnut:）
    1、 在components文件创建 demo文件夹
    2、做demo文件夹中创建 index.js 组件内容
    3、 做demo文件夹中创建 index.scss 组件样式
    4、 做demo文件夹中创建 action.js 创建业务的逻辑函数
    5、 做demo文件夹中创建 reducer.js 创建业务的 store
    6、 做containers文件夹中创建 demo.js 业务模块容器
    7、 做reducers/index.js中聚合
    * import demoReducer from "Components/demo/reducer";
    * demo: {reducer: demoReducer, isCached: false}, 导出中增加 其中isCached表示是否需要缓存，如果需要 只需设置true即可
    8、 做router/bundle_load.js中聚合
    * import DemoContainer from "Containers/demo";
    * export const Demo = props => (
    *
    * {Container => }
    *
    *)
    9、 做router/index.js中聚合
    * {path:'/demo', component:containers.Demo} 导出中增加