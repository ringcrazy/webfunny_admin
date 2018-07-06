import envConfig from "./env_config"

const apiHost = envConfig.getApiHost()
// const nodeApiHost = envConfig.getNodeApiHost()
// const { userId, userTag } = window.appState
// const { userId } = window.appState

const api = {

  /**
   * 提交用户资料
   * 接口文档: http://confluence.win.fenqi.im/pages/viewpage.action?pageId=13770395
   */
  "submitFriendInfo": apiHost + "/omega/customer/recommend"
  /**
   * 提交用户资料
   * 接口文档: http://confluence.win.fenqi.im/pages/viewpage.action?pageId=13770395
   */
  , "getFriends": (openId) => apiHost + "/omega/customer/friends/" + openId
  /**
   * 获取提现信息
   * 接口文档: http://confluence.win.fenqi.im/pages/viewpage.action?pageId=13770395
   */
  , "getCashInfo": (openId) => apiHost + "/omega/customer/totalearnings/" + openId
  /**
   * 获取提现信息
   * 接口文档: http://confluence.win.fenqi.im/pages/viewpage.action?pageId=13770395
   */
  , "accountDetail": (openId) => apiHost + "/omega/customer/account-detail/" + openId
  /**
   * 提交用户资料
   * 接口文档: http://confluence.win.fenqi.im/pages/viewpage.action?pageId=13770395
   */
  , "withdraw": apiHost + "/omega/customer/withdraw"
  /**
   * 提交用户资料
   * 接口文档: http://confluence.win.fenqi.im/pages/viewpage.action?pageId=13770395
   */
  , "submitMobileInfo": apiHost + "/omega/customer/contact"
  /**
   * 获取验证码
   * 接口文档: http://confluence.win.fenqi.im/pages/viewpage.action?pageId=14620011
   */
  , "sendValidationCode": apiHost + "/superapp/openAccountCenter/omega/sms/validationCode/mobile"
  /**
   * 校验验证码
   * 接口文档: http://confluence.win.fenqi.im/pages/viewpage.action?pageId=14620011
   */
  , "checkValidationCode": apiHost + "/superapp/openAccountCenter/omega/sms/validate"
  /**
   * 获取验证码
   * 接口文档: http://confluence.win.fenqi.im/pages/viewpage.action?pageId=14623355
   */
  , "sendWechatValidationCode": apiHost + "/superapp/openAccountCenter/omega/sms/wechat/validationCode/mobile"
  /**
   * 校验验证码
   * 接口文档: http://confluence.win.fenqi.im/pages/viewpage.action?pageId=14623355
   */
  , "checkWechatValidationCode": apiHost + "/superapp/openAccountCenter/omega/sms/wechat/validate",
}

const nodeApi = {
}

export default {
  ...api
  , ...nodeApi
}

