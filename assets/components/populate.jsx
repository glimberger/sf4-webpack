import React, { Component } from 'react'

/**
 * Passes a DOM element to a HOC and returns the latter.
 *
 * @param {Element} element A DOM element with a `data-state` attribute
 * @constructor
 */
const Populate = (element) => {
  const data = JSON.parse(atob(element.getAttribute(`data-state`)))

  /**
   * Higher Order Component (HOC) that injects data as initial state in the given component.
   *
   * @param {Component} ComponentToBePopulated
   * @returns {PopulateComponent}
   */
  const PopulateHOC = (ComponentToBePopulated) => {
    class PopulateComponent extends Component {

      constructor (props) {
        super(props)
        this.initialState = data
      }

      render () {
        return (
          <ComponentToBePopulated
            {...this.props}
            initialState={this.initialState}
          />
        )
      }
    }

    // we used a named function for logging
    return PopulateComponent
  }

  return PopulateHOC
}

export default Populate