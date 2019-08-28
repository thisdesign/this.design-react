const views = {
  work: props => {
    switch (props.theme.view) {
      case 'about':
        return -100
      case 'work':
        return 0
      default:
        return -50
    }
  },
  root: props => {
    switch (props.theme.view) {
      case 'about':
        return -100
      case 'work':
        return 100
      default:
        return 0
    }
  },
  about: props => {
    switch (props.theme.view) {
      case 'about':
        return 0
      case 'work':
        return 100
      default:
        return 50
    }
  },
}

export default views
