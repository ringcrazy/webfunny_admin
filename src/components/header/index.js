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
    const gitMenu = <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/a597873885/webfunny_monitor.git"><img className="code-icon" src={require("Images/common/git_code.png")}/>页面探针代码</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/a597873885/webfunny_servers.git"><img className="code-icon" src={require("Images/common/git_code.png")}/>分析后台代码</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/a597873885/webfunny_admin.git"><img className="code-icon" src={require("Images/common/git_code.png")}/>展示平台代码</a>
      </Menu.Item>
    </Menu>
    const blogMenu = <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.cnblogs.com/warm-stranger/p/8837784.html"><img className="blog-icon" src={require("Images/common/blog_icon.png")}/>搭建前端监控系统（一）阿里云服务器搭建篇</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.cnblogs.com/warm-stranger/p/9417084.html"><img className="blog-icon" src={require("Images/common/blog_icon.png")}/>搭建前端监控系统（二）JS错误监控篇</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.cnblogs.com/warm-stranger/p/9556442.html"><img className="blog-icon" src={require("Images/common/blog_icon.png")}/>搭建前端监控系统（三）NodeJs服务器部署篇</a>
      </Menu.Item>
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
        <Dropdown overlay={gitMenu} placement="bottomRight">
          <a className="github-box">
            <Icon type="github" />
          </a>
        </Dropdown>
        <Dropdown overlay={blogMenu} placement="bottomRight">
          <a className="bokeyuan-box">
            <img className="browser-icon" src={require("Images/common/bokeyuan.png")}/>
          </a>
        </Dropdown>
      </section>
    </div>
  }

  choseProject(project) {
    this.setState({chooseProject: project})
    this.props.chooseProject(project)
  }
}
