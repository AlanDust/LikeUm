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
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  handleListen(){
    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => recognition.start()
    } else {
      recognition.stop()
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''

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

    return(
      <div>
        <button id='mic' onClick={this.toggleListen} />
        <div id='interim'></div>
        <div id='final'></div>
      </div>
    )
  }
}

export default RecordTile;
