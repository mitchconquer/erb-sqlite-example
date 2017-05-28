import { remote } from 'electron'
import { push } from 'react-router-redux'
import { processing } from './files'

const mediaFlashcards = require('videocards')

const desktopDir = remote.getGlobal('globalObj').desktopDir

export const BULK_DELETE_MEDIA = 'BULK_DELETE_MEDIA'
export const BULK_UPDATE_MEDIA = 'BULK_UPDATE_MEDIA'
export const COMBINE_MEDIA = 'COMBINE_MEDIA'
export const REMOVE_MEDIA = 'REMOVE_MEDIA'
export const RESET_MEDIA = 'RESET_MEDIA'
export const SELECT_ALL = 'SELECT_ALL'
export const SELECT_NONE = 'SELECT_NONE'
export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const UPDATE_MEDIA = 'UPDATE_MEDIA'
export const UPDATE_TEXT = 'UPDATE_TEXT'

// ACTION CREATORS

/**
 * Creates action to set media in store
 * @param {array} media - An array of objects containing subtitle text, times, ids and media file names
 */

export function combineMedia(updatedMedia, toRemove) {
  return {
    type: COMBINE_MEDIA,
    updatedMedia,
    toRemove
  }
}

export function removeMedia(index) {
  return {
    type: REMOVE_MEDIA,
    index
  }
}

export function resetMedia(media) {
  return {
    type: RESET_MEDIA,
    media
  }
}

export function updateFilter(newFilter) {
  return {
    type: UPDATE_FILTER,
    newFilter
  }
}

export function updateMedia(updatedMedia) {
  return {
    type: UPDATE_MEDIA,
    updatedMedia
  }
}

export const bulkDeleteMedia = () => ({
  type: BULK_DELETE_MEDIA
})

export function bulkUpdateMedia(updatedMedia) {
  return {
    type: BULK_UPDATE_MEDIA,
    updatedMedia
  }
}

export function toggleCheckbox(index) {
  return {
    type: TOGGLE_CHECKBOX,
    index
  }
}

export function _selectAll(filter) {
  return {
    type: SELECT_ALL,
    filter
  }
}

export function selectNone() {
  return {
    type: SELECT_NONE
  }
}

export function updateText(text, index) {
  return {
    type: UPDATE_TEXT,
    index,
    text
  }
}

// ACTION CREATOR CREATORS

export function combineSubtitles(index1, index2) {
  if (index1 === index2) {
    return
  }

  return (dispatch, getState) => {
    const { files, subtitles } = getState()

    let target,
      source
    if (index1 < index2) {
      target = subtitles.present[index1]
      source = subtitles.present[index2]
    } else {
      target = subtitles.present[index2]
      source = subtitles.present[index1]
    }

    const merged = mediaFlashcards.combineSubtitles(target, source, { replaceMedia: false })

    const videoFile = files.videoFile.path
    dispatch(processing(true))

    mediaFlashcards.updateAudio(videoFile, merged)
      .then(
        updatedMedia => dispatch(combineMedia(updatedMedia, source.index))
      )
      .then(
        () => dispatch(processing(false))
      )
  }
}

export function createApkg() {
  return (dispatch, getState) => {
    const { files, subtitles } = getState()
    const videoFile = files.videoFile.path
    dispatch(processing(true))

    mediaFlashcards.createAnkiDb(videoFile, mediaToArray(subtitles.present))
      .then(
        dbFile => mediaFlashcards.createApkg(dbFile, mediaFlashcards.quickName(videoFile), desktopDir)
      )
      .then(
        () => mediaFlashcards.rmFiles('./pkg')
      )
      .then(
        () => dispatch(processing(false))
      )
      .then(
        () => dispatch(push('/'))
      )
  }
}

export function updateMediaTimes(newMedia) {
  return (dispatch, getState) => {
    const { files } = getState()
    const videoFile = files.videoFile.path
    const subtitleData = {
      ...newMedia,
      media: mediaFlashcards.updateFileVersionHash(newMedia.media)
    }

    dispatch(processing(true))

    mediaFlashcards.updateAudio(videoFile, subtitleData)
      .then(
        updatedMedia => dispatch(updateMedia(updatedMedia))
      )
      .then(
        () => dispatch(processing(false))
      )
  }
}

export function bulkEditMedia(updatedMedia, videoPath) {
  const mediaMap = Object.keys(updatedMedia).map(key => updatedMedia[key])
  return (dispatch, getState) => {
    const videoFilePath = getState().files.videoFile.path
    mediaFlashcards.generateAudio(videoFilePath, mediaMap)
      .then(
        () => dispatch(bulkUpdateMedia(updatedMedia))
      )
  }
}

function mediaToArray(mediaObject) {
  return Object.keys(mediaObject).map(key => mediaObject[key])
}

export function selectMedia(target = 'NONE') {
  return (dispatch, getState) => {
    if (target === 'ALL') {
      dispatch(_selectAll(getState().filter))
    }
    if (target === 'NONE') {
      dispatch(selectNone())
    }
  }
}
