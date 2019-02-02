import React, {Fragment} from 'react';
import logoLogin from '../images/assets_01_2019-02-02/bear-face.png'
import fetch from 'isomorphic-fetch';
import { getTokenJogTrackerServiceURL } from '../services';
import {withRouter, Redirect} from 'react-router-dom';

class Authorization extends React.PureComponent {

  state = {
    isLoadingResp: false,
    redirect: false,
  }

  getToken = () => {
    let fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        'uuid': 'hello'
      })
    }
    this.setState({isLoadingResp: true});
    fetch(getTokenJogTrackerServiceURL, fetchOptions).then((response) => {
      console.log("response", response)
		if (response.status === 201) {
      this.setState({isLoadingResp: false});
      return response.json();
		} else {
      throw new Error("Bad response from server");
    }
	})
	.then((stories) => {
    console.log("stories", stories)
    localStorage.setItem('authToken', JSON.stringify(stories.response))
    this.setState({redirect: true})
    // this.props.history.push('/userData')

	});
  }

  render() {
    const classCss = 'Authorization';
    const {getToken} = this;
    const {isLoadingResp, redirect} = this.state;
    console.log("this.props", this.props)
    if(redirect) return <Redirect to={'/userData'}/>
    return(
      <div className={classCss}>
        <div className={classCss + '__login'}>
        {
          isLoadingResp ? 
          "Loading..." :     
          <Fragment> 
            <img alt={'logo'} src={logoLogin}/>
            <button onClick = {getToken}>Let me in</button>
          </Fragment>
        }
   
        </div>
      </div>
    )
  }
}
export default withRouter(Authorization);