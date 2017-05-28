/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage'
import EditPage from './containers/EditPage'

export default () => (
  <Router>
    <App>
      <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/edit" component={EditPage} />
      </Switch>
    </App>
  </Router>
);
