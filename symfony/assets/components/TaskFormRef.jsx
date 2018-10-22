import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import classnames from 'classnames'
import DisplayState from './DisplayState.jsx'

class TaskFormRef extends Component {
  constructor () {
    super()
    this.state = {
      task: '',
      dueDate: '',
      foo: '',
      bar: '',
      errors: {},
      foos: [],
      bars: [],
      _url : {}
    };
    ['handleChange', 'handleSubmit', 'fetchFoos', 'renderBars', 'initState'].forEach(
      propToBind => {
        this[propToBind] = this[propToBind].bind(this)
      }
    )
  }

  initState (data) {
    const {task, _url} = data

    if (!data) { return }

    this.setState({
      task: task.task,
      dueDate: task.dueDate,
      foo: task.foo,
      bar: task.bar,
      _url
    })

    this.fetchFoos()
    this.fetchBars(this.state.foo)
  }

  handleChange (event) {
    const {name, value, errors} = event.target
    this.setState({[name]: value})

    if (value) {
      this.setState({errors: {...errors, name: undefined}})
    }

    if (name === 'foo') {
      this.fetchBars(value)
      this.setState({bar: ''})
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    fetch(this.state._url.validate, {
      method: 'POST',
      body: new FormData(event.target)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status} - ${res.statusText}`)
        }
        return res.json()
      })
      .then(json => {
        this.setState({errors: json})
      })
      .catch(error => console.error(error))
  }

  fetchFoos () {
    fetch(this.state._url.fetchFoos)
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status} - ${res.statusText}`)
        }
        return res.json()
      })
      .then(foos => {
        this.setState({foos})
      })
  }

  fetchBars (fooID) {
    const formData = new FormData()
    formData.append('foo', fooID)

    fetch(this.state._url.fetchBars, {
      method: 'POST',
      body: formData
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status} - ${res.statusText}`)
        }
        return res.json()
      })
      .then(bars => {
        this.setState({bars})
      })
  }

  componentWillMount () {
    if (this.state._url.length) {
      this.fetchFoos()
      this.fetchBars(this.state.foo)
    }
  }

  renderBars () {
    const {foo, bar, bars, errors} = this.state
    const inputBarClass = {
      'form-control': true,
      'is-invalid': errors.bar
    }

    if (foo) {
      return (
        <div className="form-group">
          <label htmlFor="bar">Bar</label>
          <select
            id="bar"
            name="bar"
            value={bar}
            className={classnames(inputBarClass)}
            onChange={this.handleChange}
          >
            {bars.map(bar => (
              <option value={bar.id} key={bar.id}>
                {bar.text}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.bar}</div>
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    const {task, dueDate, foo, errors, foos} = this.state
    const inputTaskClass = {
      'form-control': true,
      'is-invalid': errors.task
    }
    const inputDueDateClass = {
      'form-control': true,
      'is-invalid': errors.dueDate
    }
    const inputFooClass = {
      'form-control': true,
      'is-invalid': errors.foo
    }

    return (
      <form name="task" onSubmit={this.handleSubmit}>
        <DisplayState state={this.state}/>
        <div className="form-group">
          <label htmlFor="task">Task</label>
          <input
            type="text"
            id="task"
            name="task"
            className={classnames(inputTaskClass)}
            value={task}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{errors.task}</div>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className={classnames(inputDueDateClass)}
            value={dueDate}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{errors.dueDate}</div>
        </div>
        <div className="form-group">
          <label htmlFor="foo">Foo</label>
          <select
            id="foo"
            name="foo"
            value={foo}
            className={classnames(inputFooClass)}
            onChange={this.handleChange}
          >
            {foos.map(foo => (
              <option value={foo.id} key={foo.id}>
                {foo.text}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.foo}</div>
        </div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
        >
          {this.renderBars()}
        </ReactCSSTransitionGroup>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    )
  }
}

export default TaskFormRef

