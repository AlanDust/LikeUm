import React, { Component } from 'react';

class SpeechesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      speech: "",
      currentUserId: "",
      buzzwordList: [],
      buzzwordId: ""
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
        buzzwordId: data.buzzword_id
      });
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
    let currentBuzzword;
    let fullSpeech;
    let newString;
    let newText;
    this.state.buzzwordList.forEach((buzzword) => {
      if(buzzword.id === this.state.buzzwordId) {
        currentBuzzword = buzzword.word
      }
    })

    fullSpeech = this.state.speech
    newString = currentBuzzword;
    let pattern = `\\b${currentBuzzword}\\b`
    let regex = new RegExp(pattern, 'g')
    newText = fullSpeech.replace(regex, newString);

    let count = 1
    let speech = ""
    let splitSpeech = newText.split(" ")
    splitSpeech.forEach((word) => {
      if(word !== currentBuzzword){
        speech += word + " "
      } else {
        speech += count + ") " + word + " "
        count ++
      }
    })

    return(
      <div>
        <h1 className="show-page-headers">Full Speech:</h1>
        <p className="show-page-content">{speech}</p>
      </div>
    )
  }
}

export default SpeechesContainer;
