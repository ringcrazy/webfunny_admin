import { handleActions } from "redux-actions"

const initialState = {
  jsErrorList: [],
  totalPercent: "0%",
  pcPercent: "0%",
  iosPercent: "0%",
  androidPercent: "0%"
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
