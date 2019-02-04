const JogTrackerServices = 'https://jogtracker.herokuapp.com/api'
const getAuthorizationJogTrackerServiceURL = JogTrackerServices + '/v1/auth/digitsLogin';
const getTokenJogTrackerServiceURL = JogTrackerServices + '/v1/auth/uuidLogin';
const authUserTokenJogTrackerServiceURL = JogTrackerServices + '/v1/auth/user';
const userDataJogTrackerServiceURL = JogTrackerServices + '/v1/data/sync';
const addNewJogTrackerServiceURL = JogTrackerServices + '/v1/data/jog';

export {
  getAuthorizationJogTrackerServiceURL,
  authUserTokenJogTrackerServiceURL,
  getTokenJogTrackerServiceURL,
  userDataJogTrackerServiceURL,
  addNewJogTrackerServiceURL,
}