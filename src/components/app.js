import React, { Component } from 'react';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';

import CamperList from './camperlist.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentCampers: [],
      allTimeCampers: [],
      currentView: 'recentCampers'
    }
  };

  componentWillMount() {
    axios.all([this.fetchRecentCampers(), this.fetchAllTimeCampers()])
    .then(axios.spread((recentCampers, allTimeCampers) => {
      /**/
        this.setState({
          recentCampers: recentCampers.data,
          allTimeCampers: allTimeCampers.data
        });
      }));
  }

  fetchRecentCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }

  fetchAllTimeCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  changeView(currentView) {
    this.setState({ currentView })
  }

  render() {
    if (!this.state.recentCampers.length && !this.state.allTimeCampers.length) {
      return <MDSpinner class ClassName="spinner" size={100} />;
    }
    return (
      <div>
        <h1>{`FCCLeaderBoard ${this.state.currentView}`}</h1>
        <button onClick= { () => this.changeView('recentCampers')} className="btn btn-primary">Recent List</button>
        <button onClick= { () => this.changeView('allTimeCampers')} className="btn btn-primary">All-time List</button>
        <CamperList campers={this.state[this.state.currentView]} />
      </div>
    );
  };
}
