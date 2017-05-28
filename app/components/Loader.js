// @flow
import React, { Component, PropTypes } from 'react'

require('../styles/loader.scss')

class Edit extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired
  };

  render() {
    const { active } = this.props

    if (!active) {
      return false
    }

    return (
      <div className="loader-container">
        <div className="spinner">
          <div className="dot1" />
          <div className="dot2" />
        </div>
      </div>
    )
  }
}

export default Edit
