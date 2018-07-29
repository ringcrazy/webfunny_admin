import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Login from "Modules/login"
import * as actions from "Modules/login/action"

const LoginContainer = props => <Login {...props} />

const mapStateToProps = state => {
  const { login } = state
  return { ...login }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
