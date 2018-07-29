import { Component, PropTypes } from "react"
class Bundle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      container: null
    }
  }
  componentWillMount() {
    this.load(this.props)
  }
  componentDidMount() {
    // 提前加载一页需要加载的组件
    this.preload(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loadContainer !== this.props.loadContainer) {
      this.load(nextProps)
      this.preload(nextProps)
    }
  }


  render() {
    const { container } = this.state

    return container ? this.props.children(container) : null
  }

  load(props) {
    document.title = props.title
    this.setState({ container: null })
    props.loadContainer( container => {
      this.setState({ container: container.default ? container.default : container })
    })
  }
  preload(props) {
    // bundle next属性传递下一个需要加载的页面的container（可以是数组，多个），可以提前加载，使得下个页面加载更快
    if (props.next) {
      const nextPages = Array.isArray(props.next) ? props.next : [props.next]

      nextPages.forEach((pageComponent) => {
        pageComponent(() => {})
      })
    }
  }
}

Bundle.propTypes = {
  loadContainer: PropTypes.func,
  children: PropTypes.func,
  title: PropTypes.string,
  entry: PropTypes.bool
}

export default Bundle
