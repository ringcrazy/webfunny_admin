import "babel-polyfill"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import createHistory from "history/createBrowserHistory"
import { ConnectedRouter } from "react-router-redux"
import { AppContainer } from "react-hot-loader"
import FastClick from "fastclick"

import getStore from "./store"
import Routes from "./router"

import "../styles/entry"

function init(reducers, extraRoutes, history) {
  history.listen((location, action) => {
    console.log(location)
    if (action === "PUSH") {
      window.pageAnimate = "push"
    }
    if (action === "POP") {
      window.pageAnimate = "back"
    }
  })
  const store = getStore(history, reducers || {})
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} key={BUILD_ENV === "local" ? Math.random() : 1}>
        <ConnectedRouter history={history}>
          <Routes extraRoutes={extraRoutes || []} />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("app")
  )
}

if (module.hot) {
  module.hot.accept()
}

export function initApp(business, reducers, extraRoutes) {
  window.appState = {}
  window.baseUrl = BUILD_ENV === "local" ? "" : business
  const history = createHistory({
    basename: window.baseUrl
  })
  if ("addEventListener" in document) {
    document.addEventListener("DOMContentLoaded", function() {
      FastClick.attach(document.body)
    }, false)
  }

  init(reducers, extraRoutes, history)
}
