import { push } from 'react-router-redux'
import { ActionTypes as UndoActionTypes } from 'redux-undo'
import { resetMedia } from './media'

const Bromise = require('bluebird')
const mediaFlashcards = require('videocards')

export const SET_FILES = 'SET_FILES'
export const SET_EMBEDDED_SUBS = 'SET_EMBEDDED_SUBS'
export const PROCESSING = 'PROCESSING'
export const INIT_UNDO_HISTORY = '@@redux-undo/INIT'
export const CLEAR_UNDO_HISTORY = UndoActionTypes.CLEAR_HISTORY

// ACTION CREATORS

/**
 * Creates action to set multiple files.
 * @param {array} files - An array of File blobs converted to objects, must have basicType `videoFile` or `subtitlesFile` properties
 */
export function setFiles(files) {
  return {
    type: SET_FILES,
    files
  }
}

/**
 * Creates an action to set the app processing state
 * @param {boolean} value - True if the app should currently block user actions, false if it should allow user actions
 */
export function processing(value) {
  return {
    type: PROCESSING,
    value
  }
}

export function setEmbeddedSubs(embeddedSubs) {
  return {
    type: SET_EMBEDDED_SUBS,
    embeddedSubs
  }
}

export const initUndoHistory = () => ({
  type: INIT_UNDO_HISTORY
})

export const clearUndoHistory = () => ({
  type: CLEAR_UNDO_HISTORY
})

// ACTION CREATOR CREATORS

export function processFiles(videoFile, subtitlesFile) {
  return dispatch => new Bromise((resolve, reject) => {
    dispatch(processing(true))
    dispatch(setFiles([videoFile, subtitlesFile]))
    dispatch(initUndoHistory())

    let subtitles
    mediaFlashcards.initializeSubs(subtitlesFile.path, videoFile.path)
        .then(
          subsFromInitialize => mediaFlashcards.transformSubs(subsFromInitialize)
        )
        .then(
          subs => mediaFlashcards.generateAudio(videoFile.path, subs)
        )
        .then(
          subs => {
            const newSubs = {}
            Object.keys(subs).forEach(key => {
              newSubs[key] = {
                ...subs[key],
                selected: false
              }
            })
            return newSubs
          }
        )
        .then(
          subs => dispatch(resetMedia(subs))
        )
        .then(
          () => dispatch(clearUndoHistory())
        )
        .then(
          () => dispatch(processing(false))
        )
        .then(
          () => dispatch(push('/edit'))
        )
  })
}

export function listEmbeddedSubs(file) {
  return dispatch => new Bromise((resolve, reject) => {
      // Get list of embeded files
    mediaFlashcards.listEmbeddedSubs(file)
        .then(
          result => dispatch(setEmbeddedSubs(result))
        )
        .then(
          () => resolve()
        )
  })
}
