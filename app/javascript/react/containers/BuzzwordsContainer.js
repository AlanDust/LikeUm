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
      return(
        <StatTile
          key = {speech.id}
          id = {speech.id}
          speech = {speech.speech}
          timestamp = {speech.updated_at}
          buzzword = {speech.buzzword_id}
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
          {speechTiles}
        </div>
      </div>
    )
  }
}

export default BuzzwordsContainer;
