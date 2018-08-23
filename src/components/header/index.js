import "./index.scss"
import React, { Component } from "react"
import { Menu, Dropdown, Icon } from "antd"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectList: [],
      chooseProject: {
        projectName: ""
      }
    }
  }

  componentDidMount() {
    HttpUtil.get(HttpApi.projectList).then( res => {
      this.setState({projectList: res.data.rows, chooseProject: res.data.rows[0]})
    }, () => {
      console.log("未能成功获取应用列表")
    })
  }

  render() {
    const { projectList, chooseProject } = this.state
    const menu =
      <Menu>
        {
          projectList.map((project, index) => {
            return <Menu.Item key={ index }>
              <a onClick={this.choseProject.bind(this, project)}>{project.projectName}</a>
            </Menu.Item>
          })
        }
      </Menu>
    return <div className="header-container">
      <section className="sub-header">
        <div className="project-select-box">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a className="ant-dropdown-link" href="#">
              {chooseProject.projectName} <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <a href="https://github.com/a597873885/webfunny_admin.git" target="_blank" className="github-box">
          <Icon type="github" />
        </a>
      </section>
    </div>
  }

  choseProject(project) {
    this.setState({chooseProject: project})
    this.props.chooseProject(project)
  }
}
