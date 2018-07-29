import { handleActions } from "redux-actions"

const initialState = {
  username: "",
  password: ""
}

export default handleActions({

  updateLoginState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearLoginState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
