import { createAction } from "redux-actions"

export const updateHomeState = createAction("updateHomeState", payload => payload)

export const clearHomeState = createAction("clearHomeState")
