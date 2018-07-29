import { handleActions } from "redux-actions"

const initialState = {
  username: "",
  password: ""
}

export default handleActions({

  updateRegisterState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearRegisterState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
