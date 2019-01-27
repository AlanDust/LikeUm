import React from 'react';

const InterimSpeechTile = props => {

  return(
    <div id='interim'>
      <h4>Interim Speech</h4>
      <i className="fas fa-quote-left"></i>
      <span>
        {props.interimSpeech}
      </span>
      <i className="fas fa-quote-right"></i>
    </div>
  )
}

export default InterimSpeechTile
