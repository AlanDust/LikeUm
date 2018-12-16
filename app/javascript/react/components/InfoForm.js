import React from 'react';

const InfoForm = props => {

  return (
    <div id='info'>
      <form>
        <label>Title of Speech</label>
        <input
          type="text"
          name="title"
          value={props.newTitle}
          onChange={props.handleNewTitle}
        />
        <label>Your Buzzword To Track</label>
        <input
          type="text"
          name="word"
          value={props.newBuzzword}
          onChange={props.handleNewBuzzword}
        />
        <button
          onClick={props.handleBuzzwordClear}
          >Clear
        </button>
      </form>
    </div>
  )
}

export default InfoForm;
