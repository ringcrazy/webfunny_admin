import "./index.scss"
import React, { Component } from "react"
import { Row, Col, Button, Icon, Table, Collapse, Timeline } from "antd"
import Header from "Components/header"
import Utils from "Common/utils"
const Panel = Collapse.Panel

class JavascriptErrorDetail extends Component {
  constructor(props) {
    super(props)
    this.analysisError = this.analysisError.bind(this)
  }

  componentDidMount() {
    const { errorMsg } = Utils.parseQs()
    this.props.getJavascriptErrorListByMsgAction({errorMsg: encodeURIComponent(errorMsg)}, (data) => {
      const { errorIndex } = this.props
      const errorList = data
      const errorDetail = this.analysisError(errorList[errorIndex])
      this.getTheLocationOfError(errorDetail.jsPathArray)
      this.props.updateJavascriptErrorDetailState({errorList, errorDetail})
    })
  }
  render() {
    const { errorDetail, errorList, errorStackList } = this.props
    const columns = [
      { title: "错误信息", dataIndex: "errorMessage", key: "errorMessage"},
      { title: "页面", dataIndex: "simpleUrl", key: "simpleUrl" },
      { title: "设备", dataIndex: "deviceName", key: "deviceName" },
      { title: "浏览器信息", dataIndex: "browserInfo", key: "browserInfo" },
      { title: <label>发生时间  <Icon type="arrow-down" /></label>, width: 200, dataIndex: "happenTime", key: "happenTime", fixed: "right"},
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 100,
        render: (text, detail, index) => {
          return <a onClick={this.showErrorDetail.bind(this, text, detail, index)}>查看详情</a>
        },
      },
    ]
    const ipIcon = <Icon type="cloud" className="ip-address-icon" />
    const browserIcon = <img className="browser-icon" src={require("Images/javascriptErrorDetail/browser.png")}/>
    let osIcon = null
    let deviceIcon = <Icon type="mobile" />
    if (errorDetail.os === "android") {
      osIcon = <Icon type="android" />
    } else if (errorDetail.os === "ios") {
      osIcon = <Icon type="apple" />
    } else if (errorDetail.os === "web") {
      osIcon = <img className="browser-icon" src={require("Images/javascriptErrorDetail/pc.png")}/>
    }
    if (errorDetail.deviceName && errorDetail.deviceName.indexOf("iphone") !== -1) {
      deviceIcon = <img className="browser-icon" src={require("Images/javascriptErrorDetail/iphone.png")}/>
    }

    const data = []
    const len = errorList.length > 100 ? 100 : errorList.length
    for (let i = 0; i < len; i ++) {
      const error = this.analysisError(errorList[i])
      const result = Object.assign({}, {key: Math.random()}, error)
      data.push(result)
    }

    return <div className="javascriptErrorDetail-container">
      <Header/>
      <Row className="detail-container">
        <Col span={16}>
          <span className="error-type">{errorDetail.errorType}</span><span className="error-url">{errorDetail.titleDetail || "..."}</span>
          <span className="error-msg"><label /><label>{errorDetail.errorMessage || "..."}</label> <label>{errorDetail.happenTime}</label></span>
          <span className="error-page-link"><Icon type="link" /><a target="_blank" href={errorDetail.simpleUrl}>{errorDetail.simpleUrl || "..."}</a></span>
        </Col>
        <Col span={8}>
          <div className="info-box">
            <span>发生次数</span>
            <span>{errorList.length > 200 ? "200+" : errorList.length}</span>
          </div>
          <div className="info-box">
            <span>影响用户</span>
            <span>69</span>
          </div>
        </Col>
        <Col span={16} className="operation-container">
          <Button>已解决<Icon type="check-circle-o" /></Button>
          <Button>忽略<Icon type="minus-circle-o" /></Button>
          <Button>删除<Icon type="delete" /></Button>
          <Button>上一个<Icon type="step-backward" /></Button>
          <Button>下一个<Icon type="step-forward" /></Button>
        </Col>
      </Row>
      <Row className="device-container">
        <Col span={6}>
          { ipIcon }
          <div className="device-info-box">
            <span>192.168.0.1</span>
            <span>次数: 100</span>
          </div>
        </Col>
        <Col span={6}>
          { browserIcon }
          <div className="device-info-box">
            <span>{errorDetail.browserName || "..."}</span>
            <span>版本: {errorDetail.browserVersion || "..."}</span>
          </div>
        </Col>
        <Col span={6}>
          { osIcon }
          <div className="device-info-box">
            <span>{errorDetail.os}</span>
            <span>版本: {errorDetail.osVersion}</span>
          </div>
        </Col>
        <Col span={6}>
          { deviceIcon }
          <div className="device-info-box">
            <span>{errorDetail.deviceName}</span>
            <span>&nbsp;</span>
          </div>
        </Col>
      </Row>
      <Row className="footprint-container">
        <Collapse bordered={false}>
          <Panel header="足迹(demo)" key="1">
            <Timeline>
              <Timeline.Item color="green">进入页面 /omega/home</Timeline.Item>
              <Timeline.Item color="green">点击了按钮 下一步</Timeline.Item>
              <Timeline.Item color="red">
                <p>发生了一个错误  Toast is not defined</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>进入页面 /omega/openAccount</p>
              </Timeline.Item>
            </Timeline>
          </Panel>
        </Collapse>
      </Row>
      <Row className="stack-container">
        <h4>Js错误堆栈</h4>
        <span className="error-msg">{ errorDetail.errorMessage }</span>
        <Collapse defaultActiveKey={["1"]} onChange={this.callback}>
          {
            errorStackList.map((stack, index) => {
              return <Panel header={stack.jsPathStr} key={index + 1}>
                <p>{decodeURIComponent(stack.code)}</p>
              </Panel>
            })
          }
        </Collapse>
      </Row>
      <Row className="table-container">
        <Table columns= {columns} dataSource={data} scroll={{ x: 2300 }} />
      </Row>
    </div>
  }
  callback(key) {
    console.log(key)
  }

  analysisError(error) {
    if (!error) return {}
    const errMsgArr = error.errorMessage.split(": ")
    const errorType = errMsgArr[0]
    const errorMessage = errMsgArr[errMsgArr.length - 1]
    const happenTime = new Date(parseInt(error.happenTime, 10)).Format("yyyy-MM-dd hh:mm:ss")
    const simpleUrl = error.simpleUrl
    const monitorIp = error.monitorIp
    const browserName = error.browserName
    const browserVersion = error.browserVersion
    const browserInfo = error.browserInfo
    const os = error.os.split(" ")[0]
    const osVersion = error.os.split(" ")[1]
    const deviceName = error.deviceName
    const jsPathArray = error.errorStack.match(/\([(http)?:]?[\S]*\d+\)/g)
    const tempArr = jsPathArray ? jsPathArray[0].split("/") : []
    const titleDetail = tempArr.length ? tempArr[tempArr.length - 1] : ""
    return {
      errorType,
      errorMessage,
      happenTime,
      simpleUrl,
      monitorIp,
      browserName,
      browserVersion,
      browserInfo,
      os,
      osVersion,
      deviceName,
      jsPathArray,
      titleDetail
    }
  }
  getTheLocationOfError(jsPathArray) {
    if (!jsPathArray || !jsPathArray.length) return
    const stackList = []
    for (let i = 0; i < jsPathArray.length; i ++) {
      const jsPathStr = jsPathArray[i].replace(/[()]/g, "")
      const strArr = jsPathStr.split(":")
      const jsPath = jsPathStr.match(/https?:\/\/\S*.js/g)[0]
      const locationX = strArr[strArr.length - 2]
      const locationY = strArr[strArr.length - 1]
      stackList.push({
        jsPathStr,
        jsPath,
        locationX,
        locationY
      })
    }
    this.props.getJavascriptErrorStackCodeAction({stackList}, (data) => {
      this.props.updateJavascriptErrorDetailState({errorStackList: data})
    })
  }
  showErrorDetail(text, detail, index) {
    const errorIndex = index
    const errorDetail = detail
    document.documentElement.scrollTop = 0
    this.props.updateJavascriptErrorDetailState({text, errorIndex, errorDetail})
  }
}

JavascriptErrorDetail.propTypes = {
}

export default JavascriptErrorDetail
