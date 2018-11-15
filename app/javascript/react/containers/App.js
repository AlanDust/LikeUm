import React from 'react'
import 'babel-polyfill';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import BuzzwordsContainer from './BuzzwordsContainer';
import SpeechesContainer from './SpeechesContainer';


export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={BuzzwordsContainer} />
    </Router>
  )
}
export default App
