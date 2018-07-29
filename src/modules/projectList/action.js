import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateProjectListState = createAction("updateProjectListState", payload => payload)

export const clearProjectListState = createAction("clearProjectListState")

export const loginAction = (handleResult) => () => {
  return HttpUtil.get(HttpApi.getBankList).then(
    response => {
      if (response.data) {
        handleResult(response.data)
      } else {
        console.log("未能成功获取支持银行卡列表")
      }
    }, () => {
      console.log("未能成功获取支持银行卡列表")
    }
  )
}
