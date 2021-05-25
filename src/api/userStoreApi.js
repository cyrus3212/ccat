import api from '../utils/Http';
import { userStoreActions, globalActions } from '../actions';

/**
 * Method used to get the list of user stores
 *
 * @param {*} Menu/profile/{enterpriseCode}
 */
export function getUserStoreList(enterpriseCode, url='Menu/profile/') {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url+enterpriseCode)
        .then(res => {
          dispatch(userStoreActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
