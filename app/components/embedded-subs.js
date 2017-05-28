import React, { Component, PropTypes } from 'react'

import '../styles/embedded-subs.scss'

class EmbeddedSubs extends Component {
  static propTypes = {
    extractSubs: PropTypes.func.isRequired,
    subs: PropTypes.array,
  };

  render() {
    const { subs, extractSubs } = this.props
    if (!subs || subs.length === 0) {
      return null
    }

    return (
      <div className="extracted-subs">
        <h4 className="extracted-subs-title">Pssst. This file has subtitles embedded in it. You can use one of them by clicking it below</h4>
        <ul>
          {subs.map(sub => (
            <li key={sub.index}>
              <a onClick={() => extractSubs(sub.index, sub.language)}>
                {sub.language}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default EmbeddedSubs
