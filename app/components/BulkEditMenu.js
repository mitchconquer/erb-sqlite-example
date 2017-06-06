// @flow
import React, { Component, PropTypes } from 'react'
import { updateMediaTimes } from '../utils/media_utils'
import classnames from 'classnames'

import '../styles/bulk-edit-menu.scss'

class BulkEditMenu extends Component {
  constructor() {
    super()
    this.shiftForward = this.shiftForward.bind(this)
    this.shiftBackward = this.shiftBackward.bind(this)
  }

  static propTypes = {
    bulkEditMedia: PropTypes.func.isRequired,
    bulkDeleteMedia: PropTypes.func.isRequired,
    media: PropTypes.object.isRequired
  }

  bulkEdit(action, position, msecs) {
    const { bulkEditMedia, media } = this.props
    const updatedMedia = {}
    Object.keys(media)
      .filter(key => media[key].selected)
      .forEach(key => {
        updatedMedia[key] = {
          ...updateMediaTimes(media[key], action, position, msecs, true)
        }
      })
    bulkEditMedia(updatedMedia)
  }

  shiftForward() {
    const { media, bulkEditMedia } = this.props
    const shiftedMedia = Object.values(media)
      .filter(mediaItem => mediaItem.selected)
      .map(mediaItem => updateMediaTimes(mediaItem, 'add', 'end', 200))
      .reduce((mediaItems, mediaItem) => ({
        ...mediaItems,
        [mediaItem.index]: updateMediaTimes(mediaItem, 'subtract', 'start', 200)
      }), {})
    bulkEditMedia(shiftedMedia)
  }

  shiftBackward() {
    const { media, bulkEditMedia } = this.props
    const shiftedMedia = Object.values(media)
      .filter(mediaItem => mediaItem.selected)
      .map(mediaItem => updateMediaTimes(mediaItem, 'subtract', 'end', 200))
      .reduce((mediaItems, mediaItem) => ({
        ...mediaItems,
        [mediaItem.index]: updateMediaTimes(mediaItem, 'add', 'start', 200)
      }), {})
    bulkEditMedia(shiftedMedia)
  }

  multipleSelected() {
    const { media } = this.props
    return Object.keys(media).filter(key => media[key].selected).length > 1
  }

  render() {
    return (
      <ul className={classnames('bulk-edit-tools nav navbar-nav navbar-left', { 'disabled': !this.multipleSelected() })}>
        <li className='navbar-text'>Bulk Editing Tools:</li>
        <li className='toolbar-button'>
          <a onClick={this.bulkEdit.bind(this, 'add', 'start', 200)}>
            <i className='fa fa-chevron-left' /><br />
            <span className="toolbar-label">
              Start Earlier
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.bulkEdit.bind(this, 'subtract', 'start', 200)}>
            <i className='fa fa-chevron-right' /><br />
            <span className="toolbar-label">
              Start Later
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.shiftBackward}>
            <i className='fa fa-angle-double-left' /><br />
            <span className="toolbar-label">
              Shift Backward
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.shiftForward}>
            <i className='fa fa-angle-double-right' /><br />
            <span className="toolbar-label">
              Shift Forward
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.bulkEdit.bind(this, 'subtract', 'end', 200)}>
            <i className='fa fa-chevron-left' /><br />
            <span className="toolbar-label">
              End Earlier
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.bulkEdit.bind(this, 'add', 'end', 200)}>
            <i className='fa fa-chevron-right' /><br />
            <span className="toolbar-label">
              End Later
            </span>
          </a>
        </li>
        <li className='toolbar-button'>
          <a onClick={this.props.bulkDeleteMedia}>
            <i className='fa fa-trash-o' /><br />
            <span className="toolbar-label">
              Delete
            </span>
          </a>
        </li>
      </ul>
    )
  }
}

export default BulkEditMenu
