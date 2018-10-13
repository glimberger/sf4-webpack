import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import classnames from 'classnames'
import DisplayState from './DisplayState.jsx'

const task = document.getElementById('task')
const data = JSON.parse(atob(task.getAttribute('data-task')))

class TaskForm extends Component {
  constructor () {
    super()
    this.state = {
      task: data.task,
      dueDate: data.dueDate,
      foo: data.foo,
      bar: data.bar,
      errors: {},
      foos: [],
      bars: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchFoos = this.fetchFoos.bind(this)
    this.fetchBars = this.fetchBars.bind(this)
  }

  handleChange (event) {
    const {name, value} = event.target
    this.setState({[name]: event.value})

    if (name === 'foo') {
      this.fetchBars(value)
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    fetch('http://localhost:8085/public/ajax_form_react_validate', {
      method: 'POST',
      body: new FormData(event.target)
    })
      .then(res => {
        if (!res.ok) { throw new Error(`${res.status} - ${res.statusText}`)}
        return res.json()
      })
      .then(json => {
        this.setState({errors: json})
      })
      .catch(error => console.error(error))
  }

  fetchFoos() {
    fetch('http://localhost:8085/public/ajax_foos')
      .then(res => {
        if (!res.ok) { throw new Error(`${res.status} - ${res.statusText}`)}
        return res.json()
      })
      .then(foos => {
        this.setState({foos})
      })
  }

  fetchBars(fooID) {
    const formData = new FormData();
    formData.append('foo', fooID);
    fetch('http://localhost:8085/public/ajax_bars', {
      method: 'POST',
      body: formData
    })
      .then(res => {
        if (!res.ok) { throw new Error(`${res.status} - ${res.statusText}`)}
        return res.json()
      })
      .then(bars => {
        this.setState({bars})
      })
  }

  componentWillMount () {
    this.fetchFoos()
    this.fetchBars(this.state.foo)
  }

  render () {
    const {task, dueDate, foo, bar, errors, foos, bars} = this.state
    const inputTaskClass = {
      'form-control': true,
      'is-invalid': errors.task
    }
    const inputDueDateClass = {
      'form-control': true,
      'is-invalid': errors.dueDate
    }
    return (
      <form name='task' onSubmit={this.handleSubmit}>
        <DisplayState state={this.state} />
        <div className="form-group">
          <label htmlFor="task">Task</label>
          <input type="text"
                 id="task"
                 name="task"
                 className={classnames(inputTaskClass)}
                 value={task} onChange={this.handleChange}
          />
          <div className="invalid-feedback">
            {errors.task}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due date</label>
          <input type="date"
                 id="dueDate"
                 name="dueDate"
                 className={classnames(inputDueDateClass)}
                 value={dueDate}
                 onChange={this.handleChange}
          />
          <div className="invalid-feedback">
            {errors.dueDate}
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor="foo">Foo</label>
          <select id='foo'
                  name='foo'
                  value={foo}
                  className={classnames({'form-control': true})}
                  onChange={this.handleChange}
          >
            {foos.map((foo) => (
              <option value={foo.id} key={foo.id}>{foo.text}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="bar">Bar</label>
          <select id='bar'
                  name='bar'
                  value={bar}
                  className={classnames({'form-control': true})}
                  onChange={this.handleChange}
          >
            {bars.map((bar) => (
              <option value={bar.id} key={bar.id}>{bar.text}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

ReactDOM.render(<TaskForm/>, task)