import { handleActions } from "redux-actions"

const initialState = {
  timeType: "month",
  jsErrorList: [],
  ignoreErrorList: [],
  jsErrorListByPage: [],
  pageErrorList: [],
  maxPageErrorCount: 0,
  totalPercent: "0",
  pcPercent: "0",
  iosPercent: "0",
  androidPercent: "0",
  activeKeyTop: "1",
  activeKeyDown: "1",
  project: null,
  simpleUrl: ""
}

export default handleActions({

  updateJavascriptErrorState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearJavascriptErrorState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
