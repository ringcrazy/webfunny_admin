import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Register from "Modules/register"
import * as actions from "Modules/register/action"

const RegisterContainer = props => <Register {...props} />

const mapStateToProps = state => {
  const { register } = state
  return { ...register }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
