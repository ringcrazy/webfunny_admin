import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateRegisterState = createAction("updateRegisterState", payload => payload)

export const clearRegisterState = createAction("clearRegisterState")

export const registerAction = (param, handleResult) => () => {
  return HttpUtil.post(HttpApi.register, param).then( response => {
    console.log(response)
    handleResult(response)
  }, () => {
    console.log("失败")
  }
  )
}

export const userListAction = (handleResult) => () => {
  return HttpUtil.get(HttpApi.userList).then( response => {
    console.log(response)
    handleResult(response)
  }, () => {
    console.log("失败")
  }
  )
}
