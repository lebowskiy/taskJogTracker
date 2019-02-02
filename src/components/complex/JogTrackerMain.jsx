import React from 'react';
import fetch from 'isomorphic-fetch';
import { userDataJogTrackerServiceURL, authUserTokenJogTrackerServiceURL } from '../../services';
import {withRouter} from 'react-router-dom';
import JogTracker from '../primitive/JogTracker';

class JogTrackerMain extends React.Component {
  state = {
    isLoadingData: false,
    users: undefined,
    jogs: undefined,
  }
  componentDidMount() {
    this.getUserJogTrackerData()
  }
  getUserJogTrackerData = () => {
    let token = JSON.parse(localStorage['authToken']);
    console.log("token", token)
    let fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.access_token}`
      },
    }
    console.log("fetchOptions", fetchOptions)
    this.setState({isLoadingData: true});
    fetch(userDataJogTrackerServiceURL, fetchOptions).then((response) => {
      console.log("response", response)
		if (response.status === 200) {
      return response.json();
		} else {
      throw new Error("Bad response from server");
    }
	}).then((stories) => {
    console.log("stories", stories);
    this.setState({
      jogs: stories.response.jogs,
      users: stories.response.users,
      isLoadingData: false,
    })
  })
  }

  render() {
    const {isLoadingData} = this.state;
    console.log("this.state", this.state)
    const classCss = 'JogTrackerMain';
    if(isLoadingData) return <div>Loading data...</div>
    return(
      <div>
        <div className={classCss + '__filter'}>
        </div>
        <div className={classCss + '__listJogs'}>
          {this.state.jogs && this.state.jogs.map((el,i) =>  { return <JogTracker key={i} {...el}/>})}
        </div>
      </div>
    )
  }
}
export default withRouter(JogTrackerMain);