import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import logo from './../../images/logo_2019-02-02/logo.png';
import logoMobile from './../../images/logo-bear-mobile/logo.png';
import { withRouter } from 'react-router-dom';
import filterActive from '../../images/filter-icon/filter-active.png';
import filterNotActive from '../../images/filter-icon-not-active/filter.png';
import { connect } from "react-redux";
import { saveState } from "../../actions/jogs";

class MenuBar extends React.Component {
  static defaultProps = {
    isAuthorization: true,
  };
  static propTypes = {
    isAuthorization: PropTypes.bool,
    cbOpenFilter: PropTypes.func,
  };

  state = {
      filterValue: false,
      menuVisible: false,
  };
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
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

  handlerFilter = () => {
    this.setState({
        filterValue: !this.state.filterValue
    }, () => {
      this.props.saveState && this.props.saveState('filter', this.state.filterValue)
    })
  };
  __renderDesktop = () => {
    const classCss = 'MenuBar';
    const {handlerFilter} = this;
    const {location: {pathname}} = this.props;
    return (
        <Fragment>
            <ul>
                <li onClick={() => this.props.history.push('/userData')}
                    data-active={pathname === '/userData'}>
                    Jogs
                </li>
                <li onClick={() => this.props.history.push('/info')}
                    data-active={pathname === '/info'}>
                    Info
                </li>
                <li onClick={() => this.props.history.push('/contact')}
                    data-active={pathname === '/contact'}>
                    Contact us
                </li>
            </ul>
            <div className={classCss + '__menu__icon-filter'}>
                <img onClick={handlerFilter} src={this.state.filterValue ? filterActive : filterNotActive}/>
            </div>
        </Fragment>
    )
  }
  __renderMobile = () => {
    const classCss = 'MenuBar';
    const {handlerFilter} = this;
    const {location: {pathname}} = this.props;
    return (
        <Fragment>
        <div className={classCss + "__menu-icon"}
             data-menuVisible={this.state.menuVisible}
             onClick={() => this.setState({menuVisible: !this.state.menuVisible})}>
          <span/>
          <span/>
          <span/>
        </div>
            <ul data-menu={this.state.menuVisible}>
                <li onClick={() => { this.setState({menuVisible: false});this.props.history.push('/userData')}}
                    data-active={pathname === '/userData'}>
                    Jogs
                </li>
                <li onClick={() => { this.setState({menuVisible: false});this.props.history.push('/info')}}
                    data-active={pathname === '/info'}>
                    Info
                </li>
                <li onClick={() => { this.setState({menuVisible: false}); this.props.history.push('/contact') }}
                    data-active={pathname === '/contact'}>
                    Contact us
                </li>
            </ul>
            <div className={classCss + '__menu__icon-filter'}>
                <img onClick={handlerFilter} src={this.state.filterValue ? filterActive : filterNotActive}/>
            </div>
        </Fragment>
    )
  }
  render() {
    const classCss = 'MenuBar';
    const {isAuthorization} = this.props;
    console.log('menuBar', this.props);
    return (
      <div className = {classCss} data-visible={this.state.menuVisible}>
      <div className = {classCss + '__logo'}>
        <img alt={'logo'} src = {!this.state.menuVisible ? logo : logoMobile}/>
      </div>
      <div className={classCss + '__menu'} >
        { isAuthorization && (
          this.state.width > 760 ? this.__renderDesktop() : this.__renderMobile()
        )}
      </div>
      </div>
    )
  }
}

export default withRouter( connect(({jogs}) => {
    return {
        jogsData: jogs.jogsData,
        isLoaded: jogs.isLoaded
    }
}, {saveState})(MenuBar) );