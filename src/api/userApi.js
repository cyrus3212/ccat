import api from '../utils/Http';
import { userActions, globalActions } from '../actions';

export function getUserProfile() {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get('User')
        .then(res => {
          dispatch(userActions.fetchProfile(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
