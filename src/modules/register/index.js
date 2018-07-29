import "./index.scss"
import React, { Component } from "react"
import { Card, Button, Input } from "antd"
class Register extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { username, password } = this.props
    return <div className="register-container">
      <Card className="box">
        <Input
          className="input-box"
          placeholder="用户名"
          value={username}
          onChange={(e) => {
            this.props.updateRegisterState({username: e.target.value})
          }}
        />
        <Input
          className="input-box"
          placeholder="密码"
          value={password}
          onChange={(e) => {
            this.props.updateRegisterState({password: e.target.value})
          }}
        />
        <Input className="input-box" placeholder="确认密码" />
        <Button className="btn" type="primary" onClick={this.register.bind(this)}>注册</Button>
        <Button className="btn" type="default" onClick={this.goLogin.bind(this)}>去登录</Button>
      </Card>
    </div>
  }
  register() {
    const { username, password } = this.props
    this.props.registerAction({ username, password }, (res) => {
      console.log(res)
    })
  }
  goLogin() {
    fetch("http://localhost:3000/api/v1/user/list", (res) => {
      console.log(res)
    })
  }
}

Register.propTypes = {
}

export default Register
