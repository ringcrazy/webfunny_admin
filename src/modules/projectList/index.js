
import "./index.scss"
import React, { Component } from "react"
import { DatePicker } from "antd"
const { MonthPicker, RangePicker } = DatePicker

function onChange(date, dateString) {
  console.log(date, dateString)
}
export default class ProjectList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return <div className="home-container">
      <div>
        <DatePicker onChange={onChange} />
        <br />
        <MonthPicker onChange={onChange} placeholder="Select month" />
        <br />
        <RangePicker onChange={onChange} />
      </div>
    </div>
  }
}
