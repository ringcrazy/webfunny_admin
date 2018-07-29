import { handleActions } from "redux-actions"

const initialState = {
  username: "",
  password: ""
}

export default handleActions({

  updateProjectListState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearProjectListState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
