import React, { Component } from 'react';
import BuzzwordTile from '../components/BuzzwordTile'
import SpeechTile from '../components/SpeechTile'


class SpeechesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    }
  }

  componentDidMount() {
  }

  render() {

    return(
      <div>
        <BuzzwordTile
        />

        <SpeechTile
        />
      </div>
    )
  }
}

export default SpeechesContainer;
