import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { routerReducer, routerMiddleware } from "react-router-redux"
import { composeWithDevTools } from "redux-devtools-extension"

const getStore = (history, extraReducers) => {
  const historyMiddleware = routerMiddleware(history)

  const middleware = BUILD_ENV === "local"
    ? composeWithDevTools(applyMiddleware(historyMiddleware, thunkMiddleware))
    : applyMiddleware(historyMiddleware, thunkMiddleware)

  // 以下是需要缓存，和不需要缓存的处理
  const reducers = {}
  for (const key in extraReducers) {
    if (!extraReducers.hasOwnProperty(key)) continue
    const obj = extraReducers[key]
    reducers[key] = obj.reducer
  }
  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    middleware
  )


  return store
}

export default getStore
