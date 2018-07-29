import "./index.scss"
import React, { Component } from "react"
import { Row, Col, Tabs, Card, Menu, Dropdown, Icon, Pagination } from "antd"
import { jsErrorOption } from "ChartConfig/jsChartOption"
const TabPane = Tabs.TabPane
const echarts = require("echarts")
class JavascriptError extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById("jsErrorCountByDay"))
    // 绘制图表
    this.props.getJsErrorCountByDayAction((result) => {
      const data = result.data
      const dateArray = [], jsErrorArray = []
      for (let i = 0; i < 30; i ++) {
        dateArray.push(data[i].day)
        jsErrorArray.push(data[i].count)
      }
      myChart.setOption(jsErrorOption([dateArray, jsErrorArray]))
    })

    // 获取js错误列表
    this.props.getJsErrorSortAction((result) => {
      this.props.updateJavascriptErrorState({jsErrorList: result.data})
    })

    this.props.getJavascriptErrorCountByOsAction((result) => {
      const pcError = parseInt(result.pcError.count, 10)
      const iosError = parseInt(result.iosError.count, 10)
      const androidError = parseInt(result.androidError.count, 10)
      const pcPv = parseInt(result.pcPv.count, 10)
      const iosPv = parseInt(result.iosPv.count, 10)
      const androidPv = parseInt(result.androidPv.count, 10)

      const errorTotal = pcError + iosError + androidError
      const pvTotal = pcPv + iosPv + androidPv

      const totalPercent = (errorTotal * 100 / pvTotal).toFixed(2)
      const pcPercent = (pcError * 100 / pcPv).toFixed(2)
      const iosPercent = (iosError * 100 / iosPv).toFixed(2)
      const androidPercent = (androidError * 100 / androidPv).toFixed(2)
      this.props.updateJavascriptErrorState({totalPercent, pcPercent, iosPercent, androidPercent})
    })
    // setInterval(function () {
    //   a = b + c
    // }, 5000)
  }

  render() {
    const { jsErrorList, totalPercent, pcPercent, iosPercent, androidPercent } = this.props
    const menu =
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http:// www.taobao.com/">2nd menu item</a>
        </Menu.Item>
      </Menu>

    return <div className="javascriptError-container">
      <section className="sub-header">
        <div className="project-select-box">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a className="ant-dropdown-link" href="#">
              项目名字 <Icon type="down" />
            </a>
          </Dropdown>
        </div>

      </section>

      <Row>
        <Card className="main-info-container">
          <Col span={16}>
            <Tabs defaultActiveKey="1" >
              <TabPane tab={<span><Icon type="area-chart" />月统计</span>} key="1">
                <div id="jsErrorCountByDay" className="chart-box" />
              </TabPane>
            </Tabs>
          </Col>
          <Col span={8}>
            <Tabs defaultActiveKey="1" >
              <TabPane tab={<span><Icon type="file-text" />信息概览</span>} key="1">
                <div className="info-box">
                  <span><Icon type="exception" /><label>错误率</label></span>
                  <span>{totalPercent}%</span>
                </div>
                <div className="info-box">
                  <span><Icon type="ie" /><label>PC</label></span>
                  <span>{pcPercent}%</span>
                </div>
                <div className="info-box">
                  <span><Icon type="apple" /><label>IOS</label></span>
                  <span>{iosPercent}%</span>
                </div>
                <div className="info-box">
                  <span><Icon type="android" /><label>Android</label></span>
                  <span>{androidPercent}%</span>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Card>

      </Row>
      <Row>
        <Card className="error-list-container">
          {
            jsErrorList.map((error, index) => {
              const msgArr = error.errorMessage.split(": ")
              const len = msgArr.length
              return <p key={index}><span className="status-icon"/><span>{msgArr[0] || "空"}</span><span>{msgArr[len - 1] || "..."}</span><span>({error.count}/次)</span></p>
            })
          }
        </Card>
      </Row>
      <Pagination defaultCurrent={6} total={30} />
    </div>
  }
}

JavascriptError.propTypes = {
}

export default JavascriptError
