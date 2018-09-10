import envConfig from "./env_config"

const apiHost = envConfig.getApiHost()
const api = {
  // 登录
  "login": apiHost + "/api/v1/user/login",
  // 注册
  "register": apiHost + "/api/v1/user",
  // 查询所有用户
  "userList": apiHost + "/api/v1/user/list",
  // 查询所有项目列表
  "projectList": apiHost + "/api/v1/project/list",


  // 根据时间查询每天JS的错误量
  "getJsErrorCountByDay": apiHost + "/api/v1/getJavascriptErrorInfoListByDay",
  // 根据时间查询一天内js错误总量和最近几小时的错误量
  "getJsErrorCountByHour": apiHost + "/api/v1/getJavascriptErrorInfoListByHour",
  // 根据JS错误量进行排序
  "getJsErrorSort": apiHost + "/api/v1/getJavascriptErrorSort",
  // 根据平台获取JS错误数量
  "getJavascriptErrorCountByOs": apiHost + "/api/v1/getJavascriptErrorCountByOs",
  // errorMsg 获取js错误列表
  "getJavascriptErrorListByMsg": apiHost + "/api/v1/getJavascriptErrorListByMsg",
  // 获取js错误相关信息
  "getJavascriptErrorAboutInfo": apiHost + "/api/v1/getJavascriptErrorAboutInfo",
  // 获取js错误详情
  "getJavascriptErrorDetail": id => apiHost + "/api/v1/javascriptErrorInfo/" + id,
  // 获取js错误对应的code
  "getJavascriptErrorStackCode": apiHost + "/api/v1/getJavascriptErrorStackCode",
  // 根据页面每天JS的错误量
  "getJavascriptErrorListByPage": apiHost + "/api/v1/getJavascriptErrorListByPage",
  // 设置需要忽略的js错误
  "setIgnoreJavascriptError": apiHost + "/api/v1/ignoreError",
  // 获取忽略的js错误列表
  "ignoreErrorByApplication": apiHost + "/api/v1/ignoreErrorByApplication",

}

const nodeApi = {
}

export default {
  ...api,
  ...nodeApi
}

