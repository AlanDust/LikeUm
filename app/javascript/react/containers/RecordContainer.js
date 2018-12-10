import React, { Component } from 'react';
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
      intermSpeech: "",
      finalSpeech: ""
    }
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.handleNewBuzzword = this.handleNewBuzzword.bind(this);
    this.handleBuzzwordClear = this.handleBuzzwordClear.bind(this);
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
      document.getElementById('interim').innerHTML = interimTranscript
      document.getElementById('final').innerHTML = finalTranscript
    }
  }

  handleNewBuzzword(event) {
    this.setState({ newBuzzword: event.target.value })
  }

  handleBuzzwordClear(event) {
    event.preventDefault();
    this.setState({ newBuzzword: ""})
  }

  render() {

    console.log(this.state.newBuzzword)

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
        />

        <FinalSpeechTile
        />
      </div>
    )
  }
}

export default RecordContainer;
