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

  async componentDidMount() {
    const { errorMsg } = Utils.parseQs()
    let errorDetail = []
    await this.props.getJavascriptErrorListByMsgAction({errorMsg: encodeURIComponent(errorMsg)}, (data) => {
      const { errorIndex } = this.props
      const errorList = data
      errorDetail = this.analysisError(errorList[errorIndex])
      this.getTheLocationOfError(errorDetail.jsPathArray)
      this.props.updateJavascriptErrorDetailState({errorList, errorDetail})
    })

    this.props.getJavascriptErrorAboutInfoAction({errorMsg: encodeURIComponent(errorMsg), customerKey: errorDetail.customerKey}, (res) => {
      this.props.updateJavascriptErrorDetailState({errorAboutInfo: res})
    })
  }
  render() {
    const { errorDetail, errorList, errorStackList, errorAboutInfo } = this.props
    const columns = [
      { title: "错误信息", dataIndex: "errorMessage", key: "errorMessage"},
      { title: "页面", dataIndex: "simpleUrl", key: "simpleUrl" },
      { title: "设备", dataIndex: "deviceName", key: "deviceName" },
      { title: "客户IP地址", dataIndex: "monitorIp", key: "monitorIp" },
      { title: "省份", dataIndex: "province", key: "province" },
      { title: "城市", dataIndex: "city", key: "city" },
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
    } else if (errorDetail.os === "ios" || errorDetail.os === "Mac") {
      osIcon = <Icon type="apple" />
    } else if (errorDetail.os === "Windows") {
      osIcon = <img className="browser-icon" src={require("Images/javascriptErrorDetail/windows.png")}/>
    }
    if (errorDetail.deviceName && errorDetail.deviceName.indexOf("iphone") !== -1) {
      deviceIcon = <img className="browser-icon" src={require("Images/javascriptErrorDetail/iphone.png")}/>
    } else if (errorDetail.deviceName && errorDetail.deviceName.indexOf("PC") !== -1) {
      deviceIcon = <img className="browser-icon" src={require("Images/javascriptErrorDetail/pc.png")}/>
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
            <span>{errorList.length >= 200 ? "200+" : errorList.length}</span>
          </div>
          <div className="info-box">
            <span>影响用户</span>
            <span>{errorAboutInfo.customerCount}</span>
          </div>
        </Col>
        <Col span={16} className="operation-container">
          <Button disabled>已解决<Icon type="check-circle-o" /></Button>
          <Button disabled>忽略<Icon type="minus-circle-o" /></Button>
          <Button disabled>删除<Icon type="delete" /></Button>
          <Button onClick={this.turnToPrev.bind(this)}>上一个<Icon type="step-backward" /></Button>
          <Button onClick={this.turnToNext.bind(this)}>下一个<Icon type="step-forward" /></Button>
        </Col>
      </Row>
      <Row className="device-container">
        <Col span={6}>
          { ipIcon }
          <div className="device-info-box">
            <span><label className="customer-key">{errorDetail.monitorIp || "..."}</label></span>
            <span>发生{errorAboutInfo.occurCount || 0}次 </span>
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
      {
        <Row className="footprint-container">
          <Collapse bordered={false}>
            <Panel header="足迹(demo)" key="1">
              <Timeline>
                <Timeline.Item color="green">进入页面 /omega/home</Timeline.Item>
                <Timeline.Item color="green">点击了按钮 下一步</Timeline.Item>
                <Timeline.Item color="red">
                  <p>发生了一个错误 Toast is not defined</p>
                </Timeline.Item>
                <Timeline.Item>
                  <p>进入页面 /omega/openAccount</p>
                </Timeline.Item>
              </Timeline>
            </Panel>
          </Collapse>
        </Row>
      }
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
          <Panel header="堆栈明细" key={errorStackList.length + 1}>
            <p>{ errorDetail.errorStack }</p>
          </Panel>
        </Collapse>
      </Row>
      <Row className="table-container">
        <Table columns= {columns} dataSource={data} scroll={{ x: 2800 }} />
      </Row>
    </div>
  }
  callback(key) {
    console.log(key)
  }
  turnToPrev() {
    const { errorList, errorIndex } = this.props
    const tempIndex = errorIndex > 0 ? errorIndex - 1 : 0
    const errorDetail = this.analysisError(errorList[tempIndex])
    this.props.updateJavascriptErrorDetailState({errorDetail, errorIndex: tempIndex})
  }
  turnToNext() {
    const { errorList, errorIndex } = this.props
    if (errorList.length >= errorIndex + 1) {
      const errorDetail = this.analysisError(errorList[errorIndex + 1])
      this.props.updateJavascriptErrorDetailState({errorDetail, errorIndex: errorIndex + 1})
      this.props.getJavascriptErrorAboutInfoAction({errorMsg: encodeURIComponent(errorDetail.errorMessage), customerKey: errorDetail.customerKey}, (res) => {
        this.props.updateJavascriptErrorDetailState({errorAboutInfo: res})
      })
    }
  }

  analysisError(error) {
    if (!error) return {}
    const errMsgArr = error.errorMessage.split(": ")
    const errorType = errMsgArr[0]
    const errorMessage = errMsgArr[errMsgArr.length - 1]
    const errorStack = error.errorStack
    const happenTime = new Date(parseInt(error.happenTime, 10)).Format("yyyy-MM-dd hh:mm:ss")
    const simpleUrl = error.simpleUrl
    const monitorIp = error.monitorIp
    let browserName = error.browserName
    let browserVersion = error.browserVersion
    const browserInfo = error.browserInfo
    let os = error.os.split(" ")[0]
    let osVersion = error.os.split(" ")[1]
    const deviceName = error.deviceName
    const jsPathArray = error.errorStack.match(/\([(http)?:]?[\S]*\d+\)/g)
    const tempArr = jsPathArray ? jsPathArray[0].split("/") : []
    const titleDetail = tempArr.length ? tempArr[tempArr.length - 1] : ""
    const customerKey = error.customerKey
    const province = error.province
    const city = error.city

    let browserArr = [], osVersionArr = []
    if (os === "web") {
      if (/Mac OS/i.test(browserInfo)) {
        os = "Mac"
        osVersionArr = browserInfo.match(/Mac OS X [0-9_]+/g)
        osVersionArr = osVersionArr[0].split(" ")
        osVersion = osVersionArr[osVersionArr.length - 1]
      } else if (/Windows/i.test(browserInfo)) {
        os = "Windows"
        osVersionArr = browserInfo.match(/Windows NT [0-9.]+/g)
        osVersionArr = osVersionArr[0].split(" ")
        osVersion = osVersionArr[osVersionArr.length - 1]
      }
    } else {
      if (/MicroMessenger/i.test(browserInfo)) {
        browserName = "MicroMessenger(微信)"
        browserArr = browserInfo.match(/MicroMessenger\/[0-9\.]+/g)
        browserVersion = browserArr.length ? browserArr[0].split("/")[1] : "..."
      } else if (/MQQBrowser/i.test(browserInfo)) {
        browserName = "MQQBrowser"
        browserArr = browserInfo.match(/MQQBrowser\/[0-9\.]+/g)
        browserVersion = browserArr.length ? browserArr[0].split("/")[1] : "..."
      } else if (/UCBrowser/i.test(browserInfo)) {
        browserName = "UCBrowser"
        browserArr = browserInfo.match(/UCBrowser\/[0-9\.]+/g)
        browserVersion = browserArr.length ? browserArr[0].split("/")[1] : "..."
      } else if (/QihooBrowser/i.test(browserInfo)) {
        browserName = "QihooBrowser"
        browserArr = browserInfo.match(/QihooBrowser\/[0-9\.]+/g)
        browserVersion = browserArr.length ? browserArr[0].split("/")[1] : "..."
      } else if (/CriOS/i.test(browserInfo)) {
        browserName = "CriOS(谷歌)"
        browserArr = browserInfo.match(/CriOS\/[0-9\.]+/g)
        browserVersion = browserArr.length ? browserArr[0].split("/")[1] : "..."
      } else if (/DingTalk/i.test(browserInfo)) {
        browserName = "DingTalk"
        browserArr = browserInfo.match(/DingTalk\/[0-9\.]+/g)
        browserVersion = browserArr.length ? browserArr[0].split("/")[1] : "..."
      } else {
        browserName = "Mobile UI WebView"
      }
    }

    return {
      errorType,
      errorMessage,
      errorStack,
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
      titleDetail,
      customerKey,
      province,
      city
    }
  }
  getTheLocationOfError(tempJsPathArray) {
    let jsPathArray = tempJsPathArray
    if (!jsPathArray || !jsPathArray.length) {
      jsPathArray = []
    }
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
