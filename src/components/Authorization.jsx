import React, {Fragment} from 'react';
import logoLogin from '../images/assets_01_2019-02-02/bear-face.png';
import logoLoginMobile from '../images/mobile-logo/bearFace.png';
import fetch from 'isomorphic-fetch';
import { getTokenJogTrackerServiceURL } from '../services';
import {withRouter, Redirect} from 'react-router-dom';

class Authorization extends React.PureComponent {

  state = {
    isLoadingResp: false,
    redirect: false,
  }

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
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
  };

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

  render() {
    const classCss = 'Authorization';
    const {getToken} = this;
    const {isLoadingResp, redirect} = this.state;
    console.log("Authorization", this.state)
    if(redirect) return <Redirect to={'/userData'}/>
    return(
      <div className={classCss}>
        <div className={classCss + '__login'}>
        {
          isLoadingResp ? 
          "Loading..." :     
          <Fragment> 
            <img alt={'logo'} src={ this.state.width >= 760 ? logoLogin : logoLoginMobile}/>
            <button onClick = {getToken}>Let me in</button>
          </Fragment>
        }
   
        </div>
      </div>
    )
  }
}
export default withRouter(Authorization);