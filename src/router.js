import * as containers from "./bundle_load"

// 聚合路由
const prePath = BUILD_ENV === "local" ? "/webfunny" : ""
export default [
  { path: prePath + "/", component: containers.Home, exact: true }
  , { path: prePath + "/home1", component: containers.Home, exact: true }
]
