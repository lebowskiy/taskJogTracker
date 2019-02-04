import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import logo from './../../images/logo_2019-02-02/logo.png';
import { withRouter } from 'react-router-dom';

class MenuBar extends React.PureComponent {
  static defaultProps = {
    isAuthorization: true,
  }
  static PropTypes = {
    isAuthorization: PropTypes.bool,
  }
 
  render() {
    const classCss = 'MenuBar';
    const {isAuthorization} = this.props;
    console.log('menuBar', this.props);
    const {location: {pathname}} = this.props;
    return (
      <div className = {classCss}>
      <div className = {classCss + '__logo'}>
        <img alt={'logo'} src = {logo}/>
      </div>
      <div className={classCss + '__menu'}>
        { isAuthorization &&
          <Fragment>
          <ul>
          <li onClick={() => this.props.history.push('/userData')}>Jogs</li>
          <li onClick={() => this.props.history.push('/info')}>Info</li>
          <li onClick={() => this.props.history.push('/contact')}>Contact us</li>
          </ul>
          <div className={classCss + '_add'}>
          </div>
          </Fragment> 
        }
      </div>
      </div>
    )
  }
}
export default withRouter(MenuBar);