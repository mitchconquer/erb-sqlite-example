import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

require('../styles/go-menu.scss')

class GoMenu extends Component {
  static propTypes = {
    readyToGo: PropTypes.bool.isRequired,
    processFile: PropTypes.func.isRequired,
  };

  render() {
    const { processFile, readyToGo } = this.props

    const goButton = readyToGo ? (<span><span className="h1">Go</span>&nbsp;<i className="fa fa-arrow-right" aria-hidden="true" style={{ fontSize: '50px' }} /></span>) : null

    return (
      <nav className={classnames('navbar navbar-default navbar-fixed-bottom go-bar', { 'go-bar-valid': readyToGo })} onClick={readyToGo ? processFile : null}>
        <div className="container">
          <div className="col-sm-4 col-sm-offset-2 go-button">
            {goButton}
          </div>
        </div>
      </nav>
    )
  }
}

export default GoMenu

