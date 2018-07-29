import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import JavascriptError from "Modules/javascriptError"
import * as actions from "Modules/javascriptError/action"

const JavascriptErrorContainer = props => <JavascriptError {...props} />

const mapStateToProps = state => {
  const { javascriptError } = state
  return { ...javascriptError }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(JavascriptErrorContainer)
