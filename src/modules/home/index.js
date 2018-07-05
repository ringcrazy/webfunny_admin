import "./index.scss"
import React, { Component } from "react"

export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  /**
   * 组件渲染完成调用
   */
  componentDidMount() {
  }
  /**
   * 组件销毁的时候
   */
  componentWillUnmount() {
  }
  /**
   * 渲染界面
   */
  render() {
    return <div className="home-container">home</div>
  }
}
