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

// const fundebug = require("fundebug-javascript")
// fundebug.apikey = "b023d631e1bd44b6badcca3eb028229f2f9652401c14e939cd99bfbe21f94130"
// fundebug.silentVideo = false
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { hasError: false }
//   }
//
//   componentDidCatch(error, info) {
//     this.setState({ hasError: true })
//     // 将component中的报错发送到Fundebug
//     fundebug.notifyError(error, {
//       metaData: {
//         info: info
//       }
//     })
//   }
//
//   render() {
//     if (this.state.hasError) {
//       return null
//       // Note: 也可以在出错的component处展示出错信息，返回自定义的结果。
//     }
//     return this.props.children
//   }
// }

function init(reducers, extraRoutes, history) {
  history.listen((location, action) => {
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
