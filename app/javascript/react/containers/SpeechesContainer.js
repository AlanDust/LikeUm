import React, { Component } from 'react';
import BuzzwordTile from '../components/BuzzwordTile'
import SpeechTile from '../components/SpeechTile'

class SpeechesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      speech: "",
      buzzword: "",
      iterations: "",
      currentUserId: "",
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
      return fetch(`/api/v1/users/${this.state.currentUserId}/speeches/${this.props.params.id}`)
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
      this.setState({
        speech: data.speech
      })
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`);
    })
  }

  render() {

    return(
      <div>
        <BuzzwordTile
        />

        <SpeechTile
          speech = {this.state.speech}
        />
      </div>
    )
  }
}

export default SpeechesContainer;
