import React, { Fragment } from 'react';
import fetch from 'isomorphic-fetch';
import { userDataJogTrackerServiceURL, authUserTokenJogTrackerServiceURL } from '../../services';
import { withRouter } from 'react-router-dom';
import JogTracker from '../primitive/JogTracker';
import { IMaskInput } from "react-imask";
import { formatStringToDate } from '../../utils';
import {connect} from 'react-redux';
import smilePic from '../../images/smile/sad-rounded-square-emoticon.png';
import add from '../../images/Add/add.png';
import sadIcon from '../../images/sad-icon/sad-rounded-square-emoticon.png';
import NewJogForm from "../primitive/NewJogForm";
import { addNewJogs, saveJogsData } from "../../actions/jogs";


class JogTrackerMain extends React.Component {
    state = {
        isLoadingData: false,
        newJog: false,
        users: undefined,
        jogs: undefined,
        toDate: null,
        fromDate: null,
    };

    componentDidMount() {
        if(this.props.jogsData.length === 0) {
            this.getUserJogTrackerData()
        }
    }

    getUserJogTrackerData = () => {
        let token = JSON.parse( localStorage[ 'authToken' ] );
        console.log( "token", token );
        let fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
        };
        this.setState( { isLoadingData: true } );
        fetch( userDataJogTrackerServiceURL, fetchOptions ).then( ( response ) => {
            if ( response.status === 200 ) {
                return response.json();
            } else {
                throw new Error( "Bad response from server" );
            }
        } ).then( ( stories ) => {
            this.props.saveJogsData(stories.response.jogs);
            this.setState( {
                jogs: stories.response.jogs,
                users: stories.response.users,
                isLoadingData: false,
            } )
        } )
    };

    fromFilterDate = ( date ) => {
        this.setState( {
            fromDate: formatStringToDate( date )
        } )
    };

    toFilterDate = ( date ) => {
        this.setState( {
            toDate: formatStringToDate( date )
        } )
    };

    addNewJog = () => this.setState( { newJog: true } );

    getNewJog = (data) => {
        this.props.addNewJogs(data);
      console.log("data",data)
    };

    render() {
        const { isLoadingData, fromDate, toDate, newJog } = this.state;
        const { jogsData, isLoaded } = this.props;
        const { addNewJog, getNewJog } = this;
        console.log( "this.props", this.props );
        const classCss = 'JogTrackerMain';
        if ( !isLoaded ) return <div>Loading data...</div>;
        if(jogsData.length === 0) return (
            <div className={classCss}>
                <div className={classCss + '__empty-content'}>
                    <img src={sadIcon}/>
                    <p>Nothing is there</p>
                    <button onClick={ addNewJog }>Create your first jog</button>
                </div>

            </div>
        );
        const reBuildArr = isLoaded ? jogsData.filter( jog => {
            if ( fromDate !== null && toDate !== null ) {
                if ( new Date( jog.date ).getTime() >= fromDate.getTime() && new Date( jog.date ).getTime() <= toDate.getTime() ) {
                    return jog
                }
            } else return jog
        } ) : [];

        return (
            <div className={ classCss }>
                {
                    this.props.filter &&
                    <div className={ classCss + '__filter' }>
                        <div className={ classCss + '__filter__input' }>
                            <span>Date from</span>
                            <IMaskInput
                                mask={ Date }
                                radix="."
                                onAccept={ this.fromFilterDate }
                                placeholder='DD.MM.YYYY'
                            />
                        </div>
                        <div className={ classCss + '__filter__input' }>
                            <span>Date to</span>
                            <IMaskInput
                                mask={ Date }
                                radix="."
                                onAccept={ this.toFilterDate }
                                placeholder='DD.MM.YYYY'
                            />
                        </div>
                    </div>
                }

                <div className={classCss + "__content"}>
                {
                    newJog ?
                    <NewJogForm cbGetData={getNewJog}
                                 cbClosed={() => this.setState({newJog: false})}/> :
                    <Fragment>
                        <div className={ classCss + '__listJogs' }>
                            {
                                isLoaded && reBuildArr.length === 0 ?
                                <div className={ classCss + '__empty' }>
                                    <img src={ smilePic }/>
                                    Nothing find
                                </div> :
                                reBuildArr.map( ( el, i ) => { return <JogTracker key={ i } { ...el }/>} )
                            }
                        </div>
                        <div className={ classCss + '__btn-add' }>
                            <img src={ add } onClick={ addNewJog }/>
                        </div>
                    </Fragment>
                }
                </div>
            </div>
        )
    }
}

export default withRouter( connect(({jogs, saveState}) => {
    return {
        jogsData: jogs.jogsData,
        isLoaded: jogs.isLoaded,
        filter: saveState.filter,
    }
}, {saveJogsData, addNewJogs})(JogTrackerMain) );