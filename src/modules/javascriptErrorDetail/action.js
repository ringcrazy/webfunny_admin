import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateJavascriptErrorDetailState = createAction("updateJavascriptErrorDetailState", payload => payload)

export const clearJavascriptErrorDetailState = createAction("clearJavascriptErrorDetailState")

export const getJavascriptErrorDetailAction = (param, handleResult) => () => {
  return HttpUtil.get(HttpApi.getJavascriptErrorDetail(param.id), param).then( response => {
    handleResult(response)
  })
}
export const getJavascriptErrorListByMsgAction = (param, handleResult) => () => {
  return HttpUtil.post(HttpApi.getJavascriptErrorListByMsg, param).then( response => {
    handleResult(response.data)
  })
}

export const getJavascriptErrorStackCodeAction = (param, handleResult) => () => {
  return HttpUtil.post(HttpApi.getJavascriptErrorStackCode, param).then( response => {
    handleResult(response.data)
  })
}

export const getJavascriptErrorAboutInfoAction = (param, handleResult) => () => {
  return HttpUtil.post(HttpApi.getJavascriptErrorAboutInfo, param).then( response => {
    handleResult(response.data)
  })
}