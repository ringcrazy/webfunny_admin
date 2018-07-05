import { handleActions } from "redux-actions"

const initialState = {
  "isFetching": false
}

export default handleActions({

  updateHomeState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearHomeState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
