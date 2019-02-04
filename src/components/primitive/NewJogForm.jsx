import React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from "react-imask";
import closeIcon from '../../images/closeIcon/cancel.png'
import { formatStringToDate } from "../../utils";

class NewJogForm extends React.PureComponent {

    static propTypes = {
        cbGetData: PropTypes.func,
        cbClosed: PropTypes.func,
        distance: PropTypes.number,
        time: PropTypes.number,
        date: PropTypes.string,
    };

    state = {
        distance: void 0,
        time: void 0,
        date: void 0,
        isValid: true,
    };

    changeState = (value, name) => {
        if(name === 'date') {
          this.setState({
              [name]: formatStringToDate( value )
          })
        } else {
            this.setState({
                [name]: value
            })
        }
    };
    submitForm = () => {
        const {distance, time, date } = this.state;
        if(distance && time && date instanceof Date) {
            this.setState({isValid: true});
            this.props.cbGetData({distance, time, date});
            this.props.cbClosed();
        } else {
            this.setState({isValid: false})
        }
    };

    render() {
        const classCss = 'NewJogForm';
        const {changeState, submitForm} = this;
        const {isValid} = this.state;
        return (
            <div className={ classCss }>
                <div className={classCss + "__btn-close"}>
                    <img src={closeIcon}
                         onClick={this.props.cbClosed}/>
                </div>
                <div className={classCss + "__field"}>
                    <span>Distance</span>
                    <IMaskInput mask={ Number }
                                onAccept={(value) => {changeState(value, 'distance')}}
                                placeholder=''/>
                </div>
                <div className={classCss + "__field"}>
                    <span>Time</span>
                    <IMaskInput mask={ Number }
                                onAccept={(value) => {changeState(value, 'time')}}
                                placeholder=''/>
                </div>
                <div className={classCss + "__field"}>
                    <span>Date</span>
                    <IMaskInput mask={ Date }
                                radix="."
                                onAccept={(value) => {changeState(value, 'date')}}
                                placeholder=''/>
                </div>
                { !isValid && <div className={classCss + "__error"}>Complete all fields</div> }
                <button onClick={submitForm}>Save</button>
            </div>
        )
    }
};

export default NewJogForm;
