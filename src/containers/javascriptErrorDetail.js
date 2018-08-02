import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import JavascriptErrorDetail from "Modules/javascriptErrorDetail"
import * as actions from "Modules/javascriptErrorDetail/action"

const JavascriptErrorDetailContainer = props => <JavascriptErrorDetail {...props} />

const mapStateToProps = state => {
  const { javascriptErrorDetail } = state
  return { ...javascriptErrorDetail }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(JavascriptErrorDetailContainer)
