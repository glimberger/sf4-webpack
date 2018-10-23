import React, { Component } from 'react'

import TaskFormRef from './TaskFormRef.jsx'
import ReactDOM from 'react-dom'

class TaskFormContainer extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <TaskFormRef ref={childComponent => {window.childComponent = childComponent}}/>
    )
  }
}

ReactDOM.render(<TaskFormContainer />, document.getElementById('task'))