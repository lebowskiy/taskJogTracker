import {combineReducers} from 'redux';
import jogs from './jogs'
import saveState from './saveState'

export default combineReducers({
    jogs,
    saveState,
})