import React from 'react';

const InterimSpeechTile = props => {

  return(
    <div id='interim'>
      <h4>Interim Speech</h4>
        <div>
          {props.interimSpeech}
        </div>
    </div>
  )
}

export default InterimSpeechTile
