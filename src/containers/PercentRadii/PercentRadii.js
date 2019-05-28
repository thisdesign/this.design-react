import React from 'react'

export default class PercentRadii extends React.Component {
  constructor(props) {
    super(props)
    this.obj = React.createRef()
  }

  state = {
    radius: 0,
  }

  componentDidMount() {
    this.setRadius()
  }

  getObj = () => this.obj.current

  getObjMeas = () => this.getObj().clientWidth

  getRadius = () => this.getObjMeas() * (this.props.percent / 100)

  setRadius = () => {
    this.setState({
      radius: this.getRadius(),
    })
  }

  render() {
    const style = {
      borderRadius: `${this.state.radius}px`,
      overflow: 'hidden',
    }
    return (
      <div className={this.props.className} ref={this.obj} style={style}>
        {this.props.children}
      </div>
    )
  }
}

PercentRadii.defaultProps = {
  percent: 5,
}
