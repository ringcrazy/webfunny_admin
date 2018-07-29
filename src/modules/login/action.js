import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateLoginState = createAction("updateLoginState", payload => payload)

export const clearLoginState = createAction("clearLoginState")

export const loginAction = (param, handleResult) => () => {
  return HttpUtil.post(HttpApi.login, param).then( response => {
    console.log(response)
    handleResult(response)
  }, () => {
    console.log("失败")
  }
  )
}
