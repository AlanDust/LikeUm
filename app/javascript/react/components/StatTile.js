import React from 'react';

const StatTile = props => {

  return(
    <div>
      <h1 className="directions">Click on the speech below for more information</h1>
      <div className="large-1 medium-1 small-1 column">
        #
      </div>
      <div className="large-5 medium-5 small-5 column">
        timestamp
      </div>
      <div className="large-2 medium-2 small-2 column">
        time
      </div>
      <div className="large-2 medium-2 small-2 column">
        word
      </div>
      <div className="large-2 medium-2 small-2 column">
        count
      </div>
    </div>
  )
}

export default StatTile
