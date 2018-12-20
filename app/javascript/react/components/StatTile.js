import React from 'react';

const StatTile = props => {

  return(
    <div>
      <div className="large-12 medium-12 small-12 column">

        <div className="large-1 medium-1 small-1 column">
          <p>{props.title}</p>
        </div>
        <div className="large-5 medium-5 small-5 column">
          <p> {props.timestamp}</p>
        </div>
        <div className="large-2 medium-2 small-2 column">
          <p>time of speech (need to add)</p>
        </div>
        <div className="large-2 medium-2 small-2 column">
          <p>{props.buzzword}</p>
        </div>
        <div className="large-2 medium-2 small-2 column">
          <p>count (need to add) </p>
        </div>
      </div>
    </div>
  )
}

export default StatTile
