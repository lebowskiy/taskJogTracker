import fetch from "isomorphic-fetch";
import { addNewJogTrackerServiceURL } from "../services";
import { formatDate } from "../utils";



export const saveJogsData = (data) => {
    return {
        type: 'SAVE_JOGS_DATA',
        payload: data

    }
};
export const addNewJogs = (jog) => (dispatch, getState) => {
    let refactorArr = getState().jogs.jogsData;
    refactorArr.push(jog);
    dispatch({
        type: 'ADD_NEW_JOG',
        payload: refactorArr
    });
    let token = JSON.parse( localStorage[ 'authToken' ] );
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.access_token}`
        },
        body: JSON.stringify({
            'date': formatDate(jog.date),
            'time': jog.time,
            'distance': jog.distance
        })
    };
    fetch( addNewJogTrackerServiceURL, fetchOptions ).then( ( response ) => {
        if ( response.status === 201 ) {
            return response.json();
        } else {
            throw new Error( "Bad response from server" );
        }
    } )
}