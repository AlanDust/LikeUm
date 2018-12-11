import React from 'react';

const BuzzwordForm = props => {

  return (
    <div id='buzz'>
      <form>
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

export default BuzzwordForm;
