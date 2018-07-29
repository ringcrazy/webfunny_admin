import * as containers from "./bundle_load"

// 聚合路由
const prePath = BUILD_ENV === "local" ? "/webfunny" : ""
export default [
  { path: prePath + "/", component: containers.Home, exact: true },
  { path: prePath + "/home", component: containers.Home, exact: true },
  { path: prePath + "/projectList", component: containers.ProjectList },
  { path: prePath + "/register", component: containers.Register },
  { path: prePath + "/login", component: containers.Login },
  { path: prePath + "/javascriptError", component: containers.JavascriptError },
]