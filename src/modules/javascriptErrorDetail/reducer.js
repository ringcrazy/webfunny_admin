import { handleActions } from "redux-actions"

const initialState = {
  isFetching: false
}

export default handleActions({

  updateJavascriptErrorDetailState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearJavascriptErrorDetailState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
