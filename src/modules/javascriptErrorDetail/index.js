import "./index.scss"
import React, { Component } from "react"
import { Row, Col, Button, Icon, Table } from "antd"
import Header from "Components/header"
import Utils from "Common/utils"
class JavascriptErrorDetail extends Component {
  constructor(props) {
    super(props)
    this.analysisError = this.analysisError.bind(this)
  }

  componentDidMount() {
    const { errorMsg } = Utils.parseQs()
    this.props.getJavascriptErrorListByMsgAction({errorMsg}, (data) => {
      const { errorIndex } = this.props
      const errorList = data
      console.log(errorList)
      const errorDetail = this.analysisError(errorList[errorIndex])
      this.props.updateJavascriptErrorDetailState({errorList, errorDetail})
    })
  }
  render() {
    const { errorDetail, errorList } = this.props
    const columns = [
      { title: "错误信息", dataIndex: "errorMessage", key: "errorMessage"},
      { title: "页面", dataIndex: "simpleUrl", key: "simpleUrl" },
      { title: "设备", dataIndex: "deviceName", key: "deviceName" },
      { title: "浏览器信息", dataIndex: "browserName", key: "browserName" },
      { title: <label>发生时间  <Icon type="arrow-down" /></label>, width: 200, dataIndex: "happenTime", key: "happenTime", fixed: "right"},
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 100,
        render: () => <a href="#">详情</a>,
      },
    ]
    const ipIcon = <Icon type="cloud" className="ip-address-icon" />
    const browserIcon = <Icon type="ie" />
    let osIcon = null
    const deviceIcon = <Icon type="mobile" />
    if (errorDetail.os === "Android") {
      osIcon = <Icon type="android" />
    } else if (errorDetail.os === "IOS") {
      osIcon = <Icon type="apple" />
    } else if (errorDetail.os === "web") {
      osIcon = <Icon type="desktop" />
    }


    const data = []
    for (let i = 0; i < errorList.length; i ++) {
      const error = this.analysisError(errorList[i])
      const result = Object.assign({}, error)
      data.push(result)
    }
    return <div className="javascriptErrorDetail-container">
      <Header/>
      <Row className="detail-container">
        <Col span={16}>
          <span className="error-type">{errorDetail.errorType}</span><span className="error-url">{errorDetail.titleDetail}</span>
          <span className="error-msg"><label /><label>{errorDetail.errorMessage}</label> <label>{errorDetail.happenTime}</label></span>
          <span className="error-page-link"><Icon type="link" /><a target="_blank" href={errorDetail.simpleUrl}>{errorDetail.simpleUrl || "..."}</a></span>
        </Col>
        <Col span={8}>
          <div className="info-box">
            <span>发生次数</span>
            <span>190</span>
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
      <Row className="table-container">
        足迹
      </Row>
      <Row className="table-container">
        <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
      </Row>
    </div>
  }

  analysisError(error) {
    const errMsgArr = error.errorMessage.split(": ")
    const errorType = errMsgArr[0]
    const errorMessage = errMsgArr[errMsgArr.length - 1]
    const happenTime = new Date(parseInt(error.happenTime, 10)).Format("yyyy-MM-dd hh:mm:ss")
    const simpleUrl = error.simpleUrl
    const monitorIp = error.monitorIp
    const browserName = error.browserName
    const browserVersion = error.browserVersion
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
      os,
      osVersion,
      deviceName,
      jsPathArray,
      titleDetail
    }
  }
}

JavascriptErrorDetail.propTypes = {
}

export default JavascriptErrorDetail
