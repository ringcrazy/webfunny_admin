import "./index.scss"
import React, { Component } from "react"
export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return <div className="header-container">
      这是顶部导航栏
    </div>
  }
}
