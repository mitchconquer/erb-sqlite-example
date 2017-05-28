import React, { Component, PropTypes } from 'react'
import { updateMediaTimes } from '../utils/media_utils'

class Toolbar extends Component {
  static propTypes = {
    updateMedia: PropTypes.func.isRequired,
    mediaItem: PropTypes.object.isRequired
  }

  adjustTime(action, position) {
    const { mediaItem, updateMedia } = this.props
    const updatedMedia = updateMediaTimes(mediaItem, action, position, 200)
    updateMedia(updatedMedia)
  }

  shiftForward() {
    const { mediaItem, updateMedia } = this.props
    const extendEnd = updateMediaTimes(mediaItem, 'add', 'end', 200)
    const shiftedMedia = updateMediaTimes(extendEnd, 'subtract', 'start', 200)
    updateMedia(shiftedMedia)
  }

  shiftBackward() {
    const { mediaItem, updateMedia } = this.props
    const subtractEnd = updateMediaTimes(mediaItem, 'subtract', 'end', 200)
    const shiftedMedia = updateMediaTimes(subtractEnd, 'add', 'start', 200)
    updateMedia(shiftedMedia)
  }

  render() {
    return (
      <ul className="subtitle-tools">
        <li className='toolbar-button'>
          <a onClick={this.adjustTime.bind(this, 'add', 'start')}>
            <i className='fa fa-chevron-left' /><br />
            <span className="toolbar-label">
              Start Earlier
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.adjustTime.bind(this, 'subtract', 'start')}>
            <i className='fa fa-chevron-right' /><br />
            <span className="toolbar-label">
              Start Later
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.shiftBackward.bind(this)}>
            <i className='fa fa-angle-double-left' /><br />
            <span className="toolbar-label">
              Shift Backward
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.shiftForward.bind(this)}>
            <i className='fa fa-angle-double-right' /><br />
            <span className="toolbar-label">
              Shift Forward
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.adjustTime.bind(this, 'subtract', 'end')}>
            <i className='fa fa-chevron-left' /><br />
            <span className="toolbar-label">
              End Earlier
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.adjustTime.bind(this, 'add', 'end')}>
            <i className='fa fa-chevron-right' /><br />
            <span className="toolbar-label">
              End Later
            </span>
          </a>
        </li>
      </ul>
    )
  }
}

export default Toolbar
