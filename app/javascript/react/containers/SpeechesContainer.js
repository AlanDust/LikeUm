import React, { Component } from 'react';

class SpeechesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      speech: "",
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
      return fetch(`/api/v1/users/${this.state.currentUserId}/speeches/${this.props.params.id[1]}`)
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
        speech: data.speech,

      })
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`);
    })
  }

  render() {
    return(
      <div>
        <h1 className="show-page-headers">Full Speech:</h1>
        <h1 className="show-page-content">{this.state.speech}</h1>
      </div>
    )
  }
}

export default SpeechesContainer;
