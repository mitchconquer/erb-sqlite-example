// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../components/Home'
import { listEmbeddedSubs, setFiles, processEmbededSubs, processFiles, setSubsFile } from '../actions/files'

const mapDispatchToProps = dispatch => ({
  listEmbeddedSubs: file => dispatch(listEmbeddedSubs(file)),
  processFiles: (videoFile, subtitlesFile) => dispatch(processFiles(videoFile, subtitlesFile)),
  setFiles: files => dispatch(setFiles(files))
})

const mapStateToProps = state => ({
  embeddedSubs: state.files.embeddedSubs,
  processing: state.files.processing
})

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomePageContainer
