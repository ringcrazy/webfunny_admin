import { Component, PropTypes } from "react"
class Bundle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mod: null
    }
  }
  componentWillMount() {
    this.load(this.props)
  }
  componentDidMount() {
    this.preload(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
      this.preload(nextProps)
    }
  }
  load(props) {
    this.setState({mod: null})
    props.load(mod => {
      this.setState({mod: mod.default ? mod.default : mod})
    })
  }
  preload(props) {
    if (props.next) {
      const nextPages = Array.isArray(props.next) ? props.next : [props.next]
      nextPages.forEach(function(nextPage) {
        nextPage(() => {})
      })
    }
  }

  render() {
    const { mod } = this.state
    return mod ? this.props.children(mod) : null
  }
}

Bundle.defaultProps = {
  entry: false
}
Bundle.propTypes = {
  load: PropTypes.func
  , children: PropTypes.func
  , title: PropTypes.string
  , entry: PropTypes.bool
}

export default Bundle
