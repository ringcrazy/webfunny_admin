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

export const getJsErrorSortAction = (handleResult) => () => {
  return HttpUtil.get(HttpApi.getJsErrorSort).then( response => {
    handleResult(response)
  })
}

export const getJavascriptErrorCountByOsAction = (handleResult) => () => {
  return HttpUtil.get(HttpApi.getJavascriptErrorCountByOs).then( response => {
    handleResult(response.data)
  })
}