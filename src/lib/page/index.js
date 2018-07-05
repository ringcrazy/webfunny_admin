import React, { Component, PropTypes } from "react"
import { CSSTransitionGroup } from "react-transition-group"
import "./index.scss"
class Page extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { pageAnimate, ident, children } = this.props
    return (
      <CSSTransitionGroup
        transitionName={pageAnimate}
        transitionEnter
        transitionLeave
        transitionEnterTimeout={200}
        transitionLeaveTimeout={150}>
        <div key={ident}>
          {children}
        </div>
      </CSSTransitionGroup>
    )
  }
}

Page.defaultProps = {
  pageAnimate: "push"
}

Page.PropTypes = {
  pageAnimate: PropTypes.string,
  ident: PropTypes.string,
  children: PropTypes.list
}
export default Page
