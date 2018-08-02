import { createAction } from "redux-actions"
// import HttpUtil from "Common/http-util"
// import HttpApi from "Common/http-api"
export const updateJavascriptErrorDetailState = createAction("updateJavascriptErrorDetailState", payload => payload)

export const clearJavascriptErrorDetailState = createAction("clearJavascriptErrorDetailState")
