import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import ProjectList from "Modules/projectList"
import * as actions from "Modules/projectList/action"

const ProjectListContainer = props => <ProjectList {...props} />

const mapStateToProps = state => {
  const { projectList } = state
  return { ...projectList }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)
