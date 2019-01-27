import React from 'react';

const FinalSpeechTile = props => {

  return(
    <div id='final'>
      <h4>Final Speech</h4>
      <i className="fas fa-quote-left"></i>
      <span>
        {props.finalSpeech}
      </span>
      <i className="fas fa-quote-right"></i>
    </div>
  )
}

export default FinalSpeechTile
