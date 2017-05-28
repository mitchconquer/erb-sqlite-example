// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Edit from '../components/Edit'
import { combineSubtitles, createApkg, toggleCheckbox,
         updateMediaTimes, selectMedia,
         bulkEditMedia, updateText, removeMedia,
         bulkDeleteMedia
       } from '../actions/media'
import { updateFilter } from '../actions/filter'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

function mapStateToProps(state) {
  return {
    filter: state.filter,
    media: state.subtitles.present,
    canUndo: state.subtitles.past.length > 0,
    canRedo: state.subtitles.future.length > 0
  }
}

function mapDispatchToProps(dispatch) {
  return {
    bulkEditMedia: updatedMedia => dispatch(bulkEditMedia(updatedMedia)),
    bulkDeleteMedia: () => dispatch(bulkDeleteMedia()),
    combineSubtitles: (subtitle1, subtitle2) => dispatch(combineSubtitles(subtitle1, subtitle2)),
    createApkg: () => dispatch(createApkg()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
    onUndo: () => dispatch(UndoActionCreators.undo()),
    removeMedia: index => dispatch(removeMedia(index)),
    selectMedia: target => dispatch(selectMedia(target)),
    toggleCheckbox: index => dispatch(toggleCheckbox(index)),
    updateFilter: newFilter => dispatch(updateFilter(newFilter)),
    updateMedia: newMedia => dispatch(updateMediaTimes(newMedia)),
    updateText: (text, index) => dispatch(updateText(text, index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
