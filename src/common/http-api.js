import envConfig from "./env_config"

const apiHost = envConfig.getApiHost()
const api = {
  // 登录
  "login": apiHost + "/api/v1/user/login",
  // 注册
  "register": apiHost + "/api/v1/user",
  // 查询所有用户
  "userList": apiHost + "/api/v1/user/list",
  // 根据时间查询每天JS的错误量
  "getJsErrorCountByDay": apiHost + "/api/v1/getJavascriptErrorInfoListByDay",
  // 根据JS错误量进行排序
  "getJsErrorSort": apiHost + "/api/v1/getJavascriptErrorSort",
  // 根据平台获取JS错误数量
  "getJavascriptErrorCountByOs": apiHost + "/api/v1/getJavascriptErrorCountByOs",
  // errorMsg 获取js错误列表
  "getJavascriptErrorListByMsg": apiHost + "/api/v1/getJavascriptErrorListByMsg",
  // 获取js错误详情
  getJavascriptErrorDetail: id => apiHost + "/api/v1/javascriptErrorInfo/" + id,

}

const nodeApi = {
}

export default {
  ...api,
  ...nodeApi
}

