import Bromise from 'bluebird'
import { remote } from 'electron'
const mediaFlashcards = require('videocards')

export function updateMediaTimes(media, action, position, msecs, useVersionHash) {
  const updatedMedia = {
    ...media
  }

  if (useVersionHash) {
    updatedMedia.media = mediaFlashcards.updateFileVersionHash(updatedMedia.media)
  }

  if (action === 'add') {
    updatedMedia.duration += (msecs / 1000)
    if (position === 'start') {
      const newStart = mSecondsToTime(timeInMSeconds(media.startTime) - msecs)
      updatedMedia.startTime = newStart
    }
    if (position === 'end') {
      const newEnd = mSecondsToTime(timeInMSeconds(media.endTime) + msecs)
      updatedMedia.endTime = newEnd
    }
  }

  if (action === 'subtract') {
    updatedMedia.duration -= (msecs / 1000)
    if (position === 'start') {
      const newStart = mSecondsToTime(timeInMSeconds(media.startTime) + msecs)
      updatedMedia.startTime = newStart
    }
    if (position === 'end') {
      const newEnd = mSecondsToTime(timeInMSeconds(media.endTime) - msecs)
      updatedMedia.endTime = newEnd
    }
  }

  return updatedMedia
}

export function extractSubsFile(index, videoFile) {
  return new Bromise((resolve, reject) => {
    mediaFlashcards.extractSubs(index, videoFile)
        .then(
          extractedSubs => {
            const subsData = {
              path: extractedSubs,
              name: `${mediaFlashcards.quickName(extractedSubs)}.srt`
            }
            resolve(subsData)
          }
        )
  })
}

function getDurationInSeconds(startTime, endTime) {
  const end = timeInMSeconds(endTime)
  const start = timeInMSeconds(startTime)
  return (end - start) / 1000
}

function timeInMSeconds(timeString) {
  const timeArray = timeString.split(':')
  const hours = parseInt(timeArray[0])
  const minutes = parseInt(timeArray[1])
  const separator = (timeArray[2].indexOf(',') > -1) ? ',' : '.'
  const seconds = parseInt(timeArray[2].split(separator)[0])
  const mSeconds = parseInt(timeArray[2].split(separator)[1])

  return mSeconds + (seconds * 1000) + (minutes * 60 * 1000) + (hours * 60 * 60 * 1000)
}

function mSecondsToTime(mSecs) {
  const hours = (mSecs / (60 * 60 * 1000)) | 0
  mSecs -= (hours * 60 * 60 * 1000)
  const minutes = (mSecs / (60 * 1000)) | 0
  mSecs -= (minutes * 60 * 1000)
  const seconds = (mSecs / 1000) | 0
  mSecs -= (seconds * 1000)
  return `${hours}:${minutes}:${seconds}.${mSecs}`
}
