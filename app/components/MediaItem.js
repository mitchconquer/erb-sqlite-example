import React, { Component, PropTypes } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from '../utils/item_types'
import { updateMediaTimes } from '../utils/media_utils'
import Toolbar from './Toolbar'

require('../styles/media-item.scss')

// React DnD Items
const subtitleSource = {
  beginDrag(props) {
    return {
      subtitleIndex: props.mediaItem.index
    }
  }
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


// Limit so can only drag onto adjacent subtitles

const subtitleTarget = {
  drop(props, monitor) {
    props.combineSubtitles(props.mediaItem.index, monitor.getItem().subtitleIndex)
  }
}

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

// React Component

@DragSource(ItemTypes.SUBTITLE, subtitleSource, sourceCollect)
@DropTarget(ItemTypes.SUBTITLE, subtitleTarget, targetCollect)
export default class MediaItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editedText: this.props.mediaItem.text
    }
  }
  static propTypes = {
    combineSubtitles: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    mediaItem: PropTypes.object.isRequired,
    toggleCheckbox: PropTypes.func.isRequired,
    updateMedia: PropTypes.func.isRequired,
    updateText: PropTypes.func.isRequired,
    removeMedia: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(newProps) {
    if (newProps.mediaItem.text !== this.state.editedText) {
      this.setState({
        editedText: newProps.mediaItem.text
      })
    }
  }

  addTimeEnd() {
    const { mediaItem, updateMedia } = this.props
    const updatedMedia = updateMediaTimes(mediaItem, 'add', 'end', 200)
    updateMedia(updatedMedia)
  }

  onToggleCheckbox() {
    const { mediaItem, toggleCheckbox } = this.props
    toggleCheckbox(mediaItem.index)
  }

  onUpdateText() {
    const { updateText, mediaItem } = this.props
    updateText(this.state.editedText, mediaItem.index)
  }

  onEditText(event) {
    this.setState({
      editedText: event.target.value
    })
  }

  renderText() {
    return (
      <textarea
        type="text"
        value={this.state.editedText}
        onBlur={this.onUpdateText.bind(this)}
        onChange={this.onEditText.bind(this)}
        className="media-text-input"
      />
    )
  }

  render() {
    const { selected, duration, index, media } = this.props.mediaItem
    const { connectDragSource, isDragging, connectDropTarget, isOver, removeMedia, updateMedia, mediaItem } = this.props

    let backgroundColor
    if (isDragging) {
      backgroundColor = '#b2b2b2'
    } else if (isOver) {
      backgroundColor = '#a8ffd7'
    } else {
      backgroundColor = '#fff'
    }

    return connectDropTarget(connectDragSource(
      <div className="col-xs-12" key={index}>
        <div
          className="media-item" style={{
            opacity: isDragging ? 0.5 : 1,
            backgroundColor
          }}
        >
          <div className="col-sm-1">
            <div className="media-item-checkbox">
              <input type="checkbox" checked={selected} id={`checkbox-${mediaItem.id}`} onClick={this.onToggleCheckbox.bind(this)} />
              <label htmlFor={`checkbox-${mediaItem.id}`} />
            </div>
          </div>
          <div className="col-sm-11 media-item-body">
            <a onClick={removeMedia.bind(this, index)} className="media-item-delete"><i className="fa fa-times fa-lg" aria-hidden="true" /></a>
            <br />
            <audio src={`../pkg/${media}?duration=${duration}`} controls>
              Your browser does not support the <code>audio</code> element.
            </audio>
            <br />
            <Toolbar
              updateMedia={updateMedia}
              mediaItem={mediaItem}
            />

            <div
              className="text" style={{
                opacity: isDragging ? 0.5 : 1
              }}
            >
              <div className="media-item-text">{this.renderText()}</div>
              <br />
              <div className="media-item-time media-item-start-time"><span>Start:</span>{mediaItem.startTime}</div>
              <div className="media-item-time media-item-end-time"><span>End:</span>{mediaItem.endTime}</div>
            </div>
          </div>
        </div>
      </div>
    ))
  }
}
