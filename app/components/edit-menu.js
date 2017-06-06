import React, { Component, PropTypes } from 'react'
import { updateMediaTimes } from '../utils/media_utils'
import BulkEditMenu from './BulkEditMenu'
import classnames from 'classnames'

import '../styles/edit-menu.scss'

class EditMenu extends Component {
  constructor() {
    super()
    this.selectAll = this.selectAll.bind(this)
    this.selectNone = this.selectNone.bind(this)
  }
  selectAll() {
    this.props.selectMedia('ALL')
  }

  selectNone() {
    this.props.selectMedia('NONE')
  }

  render() {
    const { onUndo, onRedo, canUndo, canRedo, createApkg } = this.props
    return (
      <nav className='navbar navbar-default navbar-toolbar'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
          </div>

          <div className='collapse navbar-collapse'>
            <ul className='nav navbar-nav'>
              <li className={classnames('toolbar-button', {disabled: !canUndo})}>
                <a onClick={onUndo} >
                  <i className="fa fa-undo" /><br />
                  <span className="toolbar-label">
                    Undo
                  </span>
                </a>
              </li>
              <li className={classnames('toolbar-button', {disabled: !canRedo})}>
                <a onClick={onRedo}>
                  <i className="fa fa-repeat" /><br />
                  <span className="toolbar-label">
                    Redo
                  </span>
                </a>
              </li>
            </ul>
            <form className='navbar-form nav navbar-nav form-filter'>
              <div className='input-group'>
                <span className='input-group-addon'><i className='fa fa-filter' /></span>
                <input type='text' className='form-control filter-input' value={this.props.filter} onChange={this.props.onFilterChange} placeholder='Filter' />
              </div>
            </form>
            <ul className='nav navbar-nav'>
              <li className='toolbar-button'>
                <a onClick={this.selectAll}>
                  <i className="fa fa-check-square-o" /><br />
                  <span className="toolbar-label">
                    Select All
                  </span>
                </a>
              </li>
              <li className='toolbar-button'>
                <a onClick={this.selectNone}>
                  <i className="fa fa-square-o" /><br />
                  <span className="toolbar-label">
                    Select None
                  </span>
                </a>
              </li>
              <li className='vertical-spacer navbar-text'></li>
            </ul>
            <BulkEditMenu media={this.props.media} bulkEditMedia={this.props.bulkEditMedia} bulkDeleteMedia={this.props.bulkDeleteMedia} />
            <ul className='nav navbar-nav navbar-right'>
              <li className='vertical-spacer navbar-text'></li>
              <li className='toolbar-button'>
                <a onClick={createApkg}>
                  <i className='fa fa-download' /><br />
                  <span className="toolbar-label">
                    Create Anki Deck!
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

EditMenu.propTypes = {
  bulkEditMedia: PropTypes.func.isRequired,
  bulkDeleteMedia: PropTypes.func.isRequired,
  createApkg: PropTypes.func.isRequired,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  media: PropTypes.object.isRequired,
  selectMedia: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  canUndo: PropTypes.bool.isRequired,
  canRedo: PropTypes.bool.isRequired,
}

export default EditMenu
