import React, { Component } from 'react';
import swal from 'sweetalert';
import SweetAlert from 'sweetalert-react';
import InfoForm from '../components/InfoForm'
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
      newTitle: "",
      newBuzzword: "",
      interimSpeech: "",
      finalSpeech: "",
      totalSeconds: 0
    }
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.handleNewTitle = this.handleNewTitle.bind(this);
    this.handleNewBuzzword = this.handleNewBuzzword.bind(this);
    this.handleInfoClear = this.handleInfoClear.bind(this);
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

    let intervalInput = document.getElementById('seconds')
    let intervalSeconds = 0;
    let myTimer;

    let startTimer = () => {
      if(this.state.listening === true){
        intervalInput.value = ++intervalSeconds;
      } else {
        this.setState({ totalSeconds: intervalInput.value});
        clearInterval(myTimer);
      }
    };

    if(this.state.listening === true) {
      myTimer = setInterval(startTimer, 1000);
    }

    if(this.state.listening === true) {
      recognition.start();
      recognition.onend = () =>
      recognition.start();

    } else if(this.state.listening === false) {
      recognition.onend = () =>
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

  handleNewTitle(event) {
    this.setState({ newTitle: event.target.value})
  }

  handleNewBuzzword(event) {
    this.setState({ newBuzzword: event.target.value })
  }

  handleInfoClear(event) {
    event.preventDefault();
    this.setState({
      newBuzzword: "",
      newTitle: ""
    })
  }

  handleSpeechClear(event) {
    this.setState({
      finalSpeech: "",
      newBuzzword: ""
    })
  }

  postToSpeech() {
    let formPayload = {
      title: this.state.newTitle,
      word: this.state.newBuzzword,
      speech: this.state.finalSpeech,
      timer: this.state.totalSeconds
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
          newTitle: "",
          newBuzzword: "",
          finalSpeech: "",
          totalSeconds: 0
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
        <InfoForm
          newTitle={this.state.newTitle}
          handleNewTitle={this.handleNewTitle}
          newBuzzword={this.state.newBuzzword}
          handleNewBuzzword={this.handleNewBuzzword}
          handleInfoClear={this.handleInfoClear}
        />
        <button id={mic} onClick={this.toggleListen} type="record">{recordingStatus}</button>
        <label>Seconds:</label> <input id="seconds"></input>
        <InterimSpeechTile
          interimSpeech={this.state.interimSpeech}
        />
        <FinalSpeechTile
          finalSpeech={this.state.finalSpeech}
        />
        <button className="save-or-clear" onClick={this.callPostToSpeech}>Save Speech</button>
        <button className="save-or-clear" onClick={this.handleSpeechClear}>Clear Speech</button>
      </div>
    )
  }
}

export default RecordContainer;
