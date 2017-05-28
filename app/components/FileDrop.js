// @flow
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Dropzone from 'react-dropzone'
import classnames from 'classnames'
import '../styles/file-drop.scss'

export default class FileDrop extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hasValidFiles: false
    }
  }

  static propTypes = {
    selectedFile: PropTypes.string,
    message: PropTypes.string.isRequired,
    listEmbeddedSubs: PropTypes.func.isRequired,
    setFile: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const newFiles = nextProps.selectedFile !== this.props.selectedFile
    if (newFiles) {
      this.setState({
        hasValidFiles: !!nextProps.selectedFile
      })
    }
  }

  onListEmbeddedSubs(acceptedFile) {
    if (this.props.type === 'videoFile') {
      this.props.listEmbeddedSubs(acceptedFile)
    }
  }

  onDrop(files) {
    const fileBlob = files[0]
    const newFile = {}
    _fileProperties.forEach(key => {
      newFile[key] = fileBlob[key]
    })
    newFile.basicType = this.props.type

    this.props.setFile(newFile, this.props.type)
    this.onListEmbeddedSubs(newFile.path)
  }

  render() {
    const { selectedFile, message, type } = this.props
    return (
      <div>
        <Dropzone
          onDropAccepted={this.onDrop.bind(this)}
          multiple={false}
          className={classnames('file-dropzone', { 'files-valid': this.state.hasValidFiles })}
          disablePreview={false}
        >
          <div>{message}</div><br />
          <div className="text-success">{selectedFile}</div>
        </Dropzone>
      </div>
    )
  }
}

const _fileProperties = [
  'lastModified',
  'lastModifiedDate',
  'name',
  'path',
  'preview',
  'size',
  'type',
  'webkitRelativePath'
]

const _mimeTypes = {
  subtitlesFile: ['.srt'],
  videoFile: '.mkv'
}
