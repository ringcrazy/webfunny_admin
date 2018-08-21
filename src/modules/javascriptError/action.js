import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateJavascriptErrorState = createAction("updateJavascriptErrorState", payload => payload)

export const clearJavascriptErrorState = createAction("clearJavascriptErrorState")

export const getJsErrorCountByDayAction = (param, handleResult) => () => {
  return HttpUtil.get(HttpApi.getJsErrorCountByDay, param).then( response => {
    handleResult(response)
  })
}
export const getJsErrorCountByHourAction = (handleResult) => () => {
  return HttpUtil.get(HttpApi.getJsErrorCountByHour).then( response => {
    handleResult(response)
  })
}
export const getJsErrorCountByPageAction = (param, handleResult) => () => {
  return HttpUtil.get(HttpApi.getJavascriptErrorListByPage, param).then( response => {
    handleResult(response.data)
  })
}

export const getJsErrorSortAction = (param, handleResult) => () => {
  return HttpUtil.post(HttpApi.getJsErrorSort, param).then( response => {
    handleResult(response)
  })
}

export const getJavascriptErrorCountByOsAction = (handleResult) => () => {
  return HttpUtil.get(HttpApi.getJavascriptErrorCountByOs).then( response => {
    handleResult(response.data)
  })
}