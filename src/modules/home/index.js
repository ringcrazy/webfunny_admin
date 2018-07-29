import "./index.scss"
import React, { Component } from "react"
import Header from "Components/header"
import { Row, Col, Card } from "antd"

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return <div className="home-container">
      <Header/>
      <Row>
        <Col span={6}>
          <Card style={{ width: "100%", float: "left" }} extra={<a href="#">更多</a>} bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
              <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <div className="custom-card">
              <h3>用户行为分析</h3>
              <p>记录用户在页面上的各种行为</p>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <a onClick={this.turnToJsError.bind(this)}>跳转到JsERROR</a>
        </Col>
      </Row>

    </div>
  }
  turnToJsError() {
    this.props.history.push("javascriptError")
  }
}
