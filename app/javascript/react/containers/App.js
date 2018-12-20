import React from 'react'
import 'babel-polyfill';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import BuzzwordsContainer from './BuzzwordsContainer';
import SpeechesContainer from './SpeechesContainer';


export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={BuzzwordsContainer} />
      <Route path='/users/:id/buzzwords' >
        <IndexRoute component={BuzzwordsContainer} />
      </Route>
      <Route path='/users/:id/speeches/:id' >
        <IndexRoute component={SpeechesContainer} />
      </Route>
    </Router>
  )
}
export default App
