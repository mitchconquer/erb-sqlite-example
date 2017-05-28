// @flow
import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import type { Children } from 'react';
// require('../styles/app.scss')

@DragDropContext(HTML5Backend)
export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
