import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateJavascriptErrorState = createAction("updateJavascriptErrorState", payload => payload)

export const clearJavascriptErrorState = createAction("clearJavascriptErrorState")

export const getJsErrorCountByDayAction = (handleResult) => () => {
  return HttpUtil.get(HttpApi.getJsErrorCountByDay).then( response => {
    handleResult(response)
  })
}
export const getJsErrorCountByPageAction = (handleResult) => () => {
  return HttpUtil.get(HttpApi.getJavascriptErrorListByPage).then( response => {
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