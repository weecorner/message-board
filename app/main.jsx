'use strict'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import store from './store'
import App from './components/App'

const history = createBrowserHistory();

render (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('main')
);