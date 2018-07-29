import "./index.scss"
import React, { Component } from "react"
import { Card, Button, Input } from "antd"
class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const {username, password} = this.props
    return <div className="login-container">
      <Card className="box">
        <Input
          className="input-box"
          placeholder="用户名"
          value={username}
          onChange={(e) => {
            this.props.updateLoginState({username: e.target.value})
          }}
        />
        <Input
          className="input-box"
          placeholder="密码"
          value={password}
          onChange={(e) => {
            this.props.updateLoginState({password: e.target.value})
          }}
        />
        <Input className="input-box" placeholder="确认密码" />
        <Button className="btn" type="primary" onClick={this.login.bind(this)}>登录</Button>
      </Card>
    </div>
  }
  login() {
    const { username, password } = this.props
    this.props.loginAction({ username, password }, (res) => {
      console.log(res)
    })
  }
}

Login.propTypes = {
}

export default Login
