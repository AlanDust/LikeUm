import React, { Component } from 'react';
import BuzzwordTile from '../components/BuzzwordTile'
import SpeechTile from '../components/SpeechTile'

let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
let recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

class RecordTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
      errors: [],
      intermSpeech: "",
      finalSpeech: ""
    }
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
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
        <button id={mic} onClick={this.toggleListen} type="record">{recordingStatus}</button>
        <div id='interim'></div>
        <div id='final'></div>
      </div>
    )
  }
}

export default RecordTile;
