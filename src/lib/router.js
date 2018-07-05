import React, { Component, PropTypes } from "react"
import { Route } from "react-router-dom"
import Page from "./page"

class Routes extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <Route render={({ location }) => {
      return <Page pageAnimate={window.pageAnimate || "push"} ident={location.pathname}>
        {this.props.extraRoutes.map((r, index) => {
          return <Route key={index} exact={r.exact} location={location} path={r.path} component={r.component} />
        })}
      </Page>
    }} />
  }
}

Routes.PropTypes = {
  extraRoutes: PropTypes.object,
}

export default Routes
