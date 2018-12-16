import React, { Component } from 'react';
import swal from 'sweetalert';
import SweetAlert from 'sweetalert-react';
import BuzzwordTile from '../components/BuzzwordTile'
import SpeechTile from '../components/SpeechTile'
import BuzzwordForm from '../components/BuzzwordForm'
import InterimSpeechTile from '../components/InterimSpeechTile'
import FinalSpeechTile from '../components/FinalSpeechTile'

let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
let recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

class RecordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
      errors: [],
      newBuzzword: "",
      interimSpeech: "",
      finalSpeech: ""
    }
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.handleNewBuzzword = this.handleNewBuzzword.bind(this);
    this.handleBuzzwordClear = this.handleBuzzwordClear.bind(this);
    this.handleSpeechClear = this.handleSpeechClear.bind(this);
    this.callPostToSpeech = this.callPostToSpeech.bind(this);
    this.postToSpeech = this.postToSpeech.bind(this);
  }

  toggleListen() {
    if(this.state.listening === false) {
      this.setState({
        listening: !this.state.listening
      }, this.handleListen);
    } else {
      this.setState({
        listening: !this.state.listening
      }, this.handleListen);
    }
  }

  handleListen(){
    if(this.state.listening === true) {
      recognition.start();
      recognition.onend = () =>
        this.setState({
          listening: !this.state.listening
        });
    } else {
      recognition.stop();
    }

    let finalTranscript = '';
    recognition.onresult = event => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      this.setState({ interimSpeech: interimTranscript})
      this.setState({ finalSpeech: finalTranscript})
    }
  }

  handleNewBuzzword(event) {
    this.setState({ newBuzzword: event.target.value })
  }

  handleBuzzwordClear(event) {
    event.preventDefault();
    this.setState({ newBuzzword: ""})
  }

  handleSpeechClear(event) {
    this.setState({
      finalSpeech: "",
      newBuzzword: ""
    })
  }

  postToSpeech() {
    let formPayload = {
      word: this.state.newBuzzword,
      speech: this.state.finalSpeech
    };
    let jsonPayload = JSON.stringify(formPayload);
    fetch(`/api/v1/users/${this.props.currentUserId}/speeches`, {
      method: 'POST',
      body: jsonPayload,
      headers: {
        'Accept':  'application/json',
        'Content-Type': 'application/json'},
        credentials: 'same-origin'
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
      .then(response => response.json())
      .then(body => {
        swal({ title: body.title, text: body.text})
      })
      .then
        (this.setState({
          newBuzzword: "",
          finalSpeech: ""
         })
        )
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    callPostToSpeech(event) {
      if (this.props.currentUserId == '') {
        swal({ title: "Sorry :(", text: "You need to be signed-in in order to save a speech"})
      } else {
        this.postToSpeech();
      }
    }

  render() {

    // console.log(this.state.newBuzzword)
    // console.log(`current user id is ${this.props.currentUserId}`)

    let mic;
    let recordingStatus;
    if(this.state.listening === false) {
      mic = "micOn"
      recordingStatus = "Rec"
    } else {
      mic = "micOff"
      recordingStatus = "Stop"
    }

    return(
      <div>
        <BuzzwordForm
          newBuzzword={this.state.newBuzzword}
          handleNewBuzzword={this.handleNewBuzzword}
          handleBuzzwordClear={this.handleBuzzwordClear}
        />
        <button id={mic} onClick={this.toggleListen} type="record">{recordingStatus}</button>
        <InterimSpeechTile
          interimSpeech={this.state.interimSpeech}
        />
        <FinalSpeechTile
          finalSpeech={this.state.finalSpeech}
        />
        <button onClick={this.callPostToSpeech}>Save Speech</button>
        <button onClick={this.handleSpeechClear}>Clear Speech</button>
      </div>
    )
  }
}

export default RecordContainer;
