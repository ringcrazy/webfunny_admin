import Utils from "Common/utils"
import "whatwg-fetch"
import "./extension"
const timeout = 30000
export default class HttpUtil {
  /**
   * get 请求
   * @param url
   * @param params
   * @param isHandleError
   * @param httpCustomerOpertion 使用者传递过来的参数, 用于以后的扩展用户自定义的行为
   * {
   *    isHandleResult: boolen    //是否需要处理错误结果   true 需要/false 不需要
   *    isShowLoading: boolen     //是否需要显示loading动画
   *    customHead: object        // 自定义的请求头
   *    timeout: int              //自定义接口超时的时间
   * }
   * @returns {Promise}
   */
  static get(url, params = {}, httpCustomerOpertion = { isHandleResult: true, isShowLoading: true }) {
    const method = "GET"
    params.webMonitorId = window.localStorage.chooseWebMonitorId
    const fetchUrl = url + Utils.qs(params)
    const fetchParams = Object.assign({}, { method }, this.getHeaders())
    return HttpUtil.handleFetchData(fetchUrl, fetchParams, httpCustomerOpertion)
  }

  /**
   * post 请求
   * @param url
   * @param params
   * @param isHandleError
   * @param httpCustomerOpertion 使用者传递过来的参数, 用于以后的扩展用户自定义的行为
   * @returns {Promise}
   */
  static post(url, params = {}, httpCustomerOpertion = { isHandleResult: true, isShowLoading: true }) {
    const method = "POST"
    params.webMonitorId = window.localStorage.chooseWebMonitorId
    const body = JSON.stringify(params)
    const fetchParams = Object.assign({}, { method, body }, this.getHeaders())
    return HttpUtil.handleFetchData(url, fetchParams, httpCustomerOpertion)
  }

  /**
   * put 请求
   * @param url
   * @param params
   * @param isHandleError
   * @param httpCustomerOpertion 使用者传递过来的参数, 用于以后的扩展用户自定义的行为
   * @returns {Promise}
   */
  static put(url, params = {}, httpCustomerOpertion = { isHandleResult: true, isShowLoading: true  }) {
    const method = "PUT"
    params.webMonitorId = window.localStorage.chooseWebMonitorId
    const body = JSON.stringify(params)
    const fetchParams = Object.assign({}, { method, body }, this.getHeaders())
    return HttpUtil.handleFetchData(url, fetchParams, httpCustomerOpertion)
  }

  /**
   * 发送fetch请求
   * @param fetchUrl
   * @param fetchParams
   * @returns {Promise}
   */
  static handleFetchData(fetchUrl, fetchParams, httpCustomerOpertion) {
    // 如果是照片的base64数据，ios系统会卡死
    // TODO: debugPanel不使用react
    const logParams = { ...fetchParams }
    if (logParams.body && logParams.body.length > 1024) {
      logParams.body = logParams.body.substr(0, 1024) + "..."
    }
    const { isShowLoading } = httpCustomerOpertion
    if (isShowLoading) {
      HttpUtil.showLoading()
    }
    httpCustomerOpertion.isFetched = false
    httpCustomerOpertion.isAbort = false
    // 处理自定义的请求头
    if (httpCustomerOpertion.hasOwnProperty("customHead")) {
      const { customHead } = httpCustomerOpertion
      fetchParams.headers = Object.assign({}, fetchParams.headers, customHead)
    }
    const fetchPromise = new Promise((resolve, reject) => {
      fetch(fetchUrl, fetchParams).then(
        response => {
          if (httpCustomerOpertion.isAbort) {
            // 请求超时后，放弃迟到的响应
            return
          }
          if (isShowLoading) {
            HttpUtil.hideLoading()
          }
          httpCustomerOpertion.isFetched = true
          response.json().then(jsonBody => {
            if (response.ok) {
              if (jsonBody.status) {
                // 业务逻辑报错
                reject(HttpUtil.handleResult(jsonBody, httpCustomerOpertion))
              } else {
                resolve(HttpUtil.handleResult(jsonBody, httpCustomerOpertion))
              }
            } else {
              // http status header <200 || >299
              let msg = "当前服务繁忙，请稍后再试"
              if (response.status === 404) {
                msg = "您访问的内容走丢了…"
              }
              console.log(msg, 2)
              reject(HttpUtil.handleResult({ fetchStatus: "error", netStatus: response.status }, httpCustomerOpertion))
            }
          }).catch(e => {
            const errMsg = e.name + " " + e.message
            reject(HttpUtil.handleResult({ fetchStatus: "error", error: errMsg, netStatus: response.status }, httpCustomerOpertion))
          })
        }
      ).catch(e => {
        const errMsg = e.name + " " + e.message
        if (httpCustomerOpertion.isAbort) {
          // 请求超时后，放弃迟到的响应
          return
        }
        if (isShowLoading) {
          HttpUtil.hideLoading()
        }
        httpCustomerOpertion.isFetched = true
        if (httpCustomerOpertion.isHandleResult === true) {
          console.log("网络开小差了，稍后再试吧", 2)
        }
        reject(HttpUtil.handleResult({ fetchStatus: "error", error: errMsg }, httpCustomerOpertion))
      })
    })
    return Promise.race([fetchPromise, HttpUtil.fetchTimeout(httpCustomerOpertion)])
  }

  /**
   * 统一处理后台返回的错误结果
   * @param result
   * ps: 通过 this.isHandleError 来判断是否需要有fetch方法来统一处理错误信息
   */
  static handleResult(result, httpCustomerOpertion) {
    if (result.status && httpCustomerOpertion.isHandleResult === true) {
      const errMsg = result.msg || result.message || "服务器开小差了，稍后再试吧"
      console.log(`${errMsg}（${result.status}）`, 2)
    }
    return result
  }
  /**
   * 控制Fetch请求是否超时
   * @returns {Promise}
   */
  static fetchTimeout(httpCustomerOpertion) {
    const { isShowLoading } = httpCustomerOpertion
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!httpCustomerOpertion.isFetched) {
          // 还未收到响应，则开始超时逻辑，并标记fetch需要放弃
          httpCustomerOpertion.isAbort = true
          if (isShowLoading) {
            HttpUtil.hideLoading()
          }
          console.log("网络开小差了，稍后再试吧", 2)
          reject({ fetchStatus: "timeout" })
        }
      }, httpCustomerOpertion.timeout || timeout)
    })
  }

  /**
   * 获取请求头信息
   * @returns {{app-info: string, access-token: string}}
   */
  static getHeaders() {
    // 需要通过app来获取
    const fetchCommonParams = {
      // "mode": "cors",
      // "credentials": "same-origin"
    }
    const headers = {
      // "Accept": "*/*",
      // "Content-Type": "application/json;charset=utf-8",
    }
    return Object.assign({}, fetchCommonParams, { headers })
  }

  /**
   * 添加loadding状态
   */
  static showLoading() {
  }

  /**
   * 取消loadding状态
   */
  static hideLoading() {
  }
}


