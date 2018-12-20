import React, { Component } from 'react';
import RecordContainer from './RecordContainer'
import StatTile from '../components/StatTile'


class BuzzwordsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      currentUserId: '',
      speechList: []
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
    .then(body => {
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
      this.setState({ speechList: data })
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`);
    })
  }


  render() {
    let speechTiles = this.state.speechList.map(speech => {
      let timestamp = new Date(speech.updated_at).toLocaleString();
      return(
        <StatTile
          key = {speech.id}
          id = {speech.id}
          title = {speech.title}
          speech = {speech.speech}
          timestamp = {timestamp}
          buzzword = {speech.buzzword_id}
          currentUserId = {this.state.currentUserId}
        />
      )
	  })
    return(
      <div>
        <h1 className="app-name"> Like Um </h1>
        <div className="large-12 medium-12 small-12 column record-button">
          <RecordContainer
            currentUserId={this.state.currentUserId}
          />
        </div>
        <div className="large-12 medium-12 small-12 column">
          <h1 className="directions">Click on the speech below for more information</h1>
        </div>
        <div className="large-12 medium-12 small-12 column">
          <div className="large-1 medium-1 small-1 column">
            <p>Title</p>
          </div>
          <div className="large-5 medium-5 small-5 column">
            <p>Timestamp</p>
          </div>
          <div className="large-2 medium-2 small-2 column">
            <p>Length</p>
          </div>
          <div className="large-2 medium-2 small-2 column">
            <p>Buzzword</p>
          </div>
          <div className="large-2 medium-2 small-2 column">
            <p># of Iterations</p>
          </div>
        </div>
          <div className="large-12 medium-12 small-12 column">
            {speechTiles}
          </div>
      </div>
    )
  }
}

export default BuzzwordsContainer;
