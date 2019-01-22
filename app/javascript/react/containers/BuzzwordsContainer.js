import React, { Component } from 'react';
import RecordContainer from './RecordContainer';
import StatTile from '../components/StatTile';

class BuzzwordsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      currentUserId: '',
      speechList: [],
      buzzwordList: [],
      currentBuzzword: ''
    }
  }

  componentDidMount() {
    fetch('/api/v1/users')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then((body) => {
      this.setState({ currentUserId: body.current_user.id });
      return fetch(`/api/v1/users/${this.state.currentUserId}/speeches`)
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
      throw(error);
      }
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({ speechList: data });
      return fetch(`/api/v1/users/${this.state.currentUserId}/buzzwords`)
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
      throw(error);
      }
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({ buzzwordList: data })
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`);
    })
  }

  render() {
    let speechTiles = this.state.speechList.map(speech => {
      let currentBuzzword
      let speechIndex
      let iterations
      this.state.buzzwordList.forEach((buzzword) => {
        if(buzzword.id === speech.buzzword_id) {
          currentBuzzword = buzzword.word
          let numberOfIterations = () => {
            speechIndex = 0;
            let fullSpeech = speech.speech;
            let speechArray = fullSpeech.split(" ");
            speechArray.forEach((word) => {
              if(word === currentBuzzword) {
                speechIndex ++;
              }
            });
            return speechIndex;
          };
          numberOfIterations();
        }
      })
      let timestamp = new Date(speech.updated_at).toLocaleString();
      return(
        <StatTile
          key = {speech.id}
          id = {speech.id}
          title = {speech.title}
          speech = {speech.speech}
          timestamp = {timestamp}
          buzzword = {currentBuzzword}
          iterations = {speechIndex}
          timer = {speech.timer}
          currentUserId = {this.state.currentUserId}
        />
      )
	  })

    return(
      <div>
        <h1 className="app-name"> Speech Helper Pro </h1>
        <h4 className="app-description"> Welcome to Speech Helper Pro.  You must sign up and sign in to save a speech.
        Please type in a title of the speech you want to record, as well as a word that you would like to keep track of.
        Click the record button and start speaking!  To stop recording, click on the Stop button.  Refresh the page to
        see your speech statistics below.  Click on the link below to see your full speech.  Enjoy! </h4>
        <div className="large-12 medium-12 small-12 column record-button">
          <RecordContainer
            currentUserId={this.state.currentUserId}
          />
        </div>
        <div className="large-12 medium-12 small-12 column">
          <h1 className="directions">Click on the speech below for more information</h1>
        </div>
        <div className="all-stat-tiles">
          <div className="large-12 medium-12 small-12 column individual-speech-tile-titles">
            <div className="large-1 medium-1 small-1 column">
              <p className="font-size-stat-tile-title">Title</p>
            </div>
            <div className="large-5 medium-5 small-5 column">
              <p className="font-size-stat-tile-title">Timestamp</p>
            </div>
            <div className="large-2 medium-2 small-2 column stats">
              <p className="font-size-stat-tile-title">Length</p>
            </div>
            <div className="large-2 medium-2 small-2 column stats">
              <p className="font-size-stat-tile-title">Buzzword</p>
            </div>
            <div className="large-2 medium-2 small-2 column stats">
              <p className="font-size-stat-tile-title"># of Iterations</p>
            </div>
          </div>
          <div className="large-12 medium-12 small-12 column individual-speech-tile">
            {speechTiles}
          </div>
        </div>
      </div>
    )
  }
}

export default BuzzwordsContainer;
