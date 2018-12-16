import React, { Component } from 'react';
import RecordContainer from './RecordContainer'
import StatTile from '../components/StatTile'


class BuzzwordsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      currentUserId: ''
    }
  }

  componentDidMount() {
    fetch('/api/v1/users')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ currentUserId: body.current_user.id });
    })
    .catch(error => {
      console.error(`Error in fetch: ${error.message}`);
    })
  }


  render() {

    return(
      <div>
        <h1 className="app-name"> Like Um </h1>
        <div className="large-12 medium-12 small-12 column record-button">
          <RecordContainer
            currentUserId={this.state.currentUserId}
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
