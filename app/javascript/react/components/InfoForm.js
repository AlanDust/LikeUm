import React from 'react';

const InfoForm = props => {

  return (
    <div id='info'>
      <form>
        <label className="labels">Title of Speech</label>
        <input
          className="labels"
          type="text"
          name="title"
          value={props.newTitle}
          onChange={props.handleNewTitle}
        />
        <label className="labels">Your Buzzword To Track</label>
        <input
          className="labels"
          type="text"
          name="word"
          value={props.newBuzzword}
          onChange={props.handleNewBuzzword}
        />
      </form>
    </div>
  )
}

export default InfoForm;
