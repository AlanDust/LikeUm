import { Link } from 'react-router';
import React, { Component } from 'react';

class StatTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  render (){

    return(
      <div>
        <div className="large-12 medium-12 small-12 column individual-stat-tile">
          <Link to={`/users/${this.props.currentUserId}/speeches/${this.props.id}`}>
            <div className="large-2 medium-2 small-2 column stats">
              <p className="font-size-stat-tile">{this.props.title}</p>
            </div>
            <div className="large-4 medium-4 small-4 column stats">
              <p className="font-size-stat-tile"> {this.props.timestamp}</p>
            </div>
            <div className="large-2 medium-2 small-2 column stats">
              <p className="font-size-stat-tile">{this.props.timer} seconds</p>
            </div>
            <div className="large-2 medium-2 small-2 column stats-two">
              <p className="font-size-stat-tile">{this.props.buzzword}</p>
            </div>
            <div className="large-2 medium-2 small-2 column stats-two">
              <p className="font-size-stat-tile">{this.props.iterations} </p>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default StatTile;
