import React, { Component } from 'react';
import RecordTile from '../components/RecordTile'
import StatTile from '../components/StatTile'


class BuzzwordsContainer extends Component {
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
        <h1 className="app-name"> Like Um </h1>
        <div className="large-12 medium-12 small-12 column record-button">
          <RecordTile
          />
        </div>
        <div className="large-12 medium-12 small-12 column">
          <StatTile
          />
        </div>
      </div>
    )
  }
}

export default BuzzwordsContainer;
