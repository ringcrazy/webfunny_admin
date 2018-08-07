import "./index.scss"
import React, { Component } from "react"
import { Menu, Dropdown, Icon } from "antd"
export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const menu =
      <Menu>
        <Menu.Item key="0">
          <a href="#">监控项目1号</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="#">监控项目2号</a>
        </Menu.Item>
      </Menu>
    return <div className="header-container">
      <section className="sub-header">
        <div className="project-select-box">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a className="ant-dropdown-link" href="#">
              项目名字 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <a href="https://github.com/a597873885/webfunny_admin.git" target="_blank" className="github-box">
          <Icon type="github" />
        </a>
      </section>
    </div>
  }
}
