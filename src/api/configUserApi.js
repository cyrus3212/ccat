import api from '../utils/Http';
import { configUserActions, globalActions } from '../actions';

export function getConfigUser(enterpriseCode, dtid = '') {
  const http = api();
  let url = `EnterpriseUsers/${enterpriseCode}?dtid=${dtid}`;
  return dispatch => {
    http.get(url)
      .then((res) => {
        dispatch(configUserActions.list(res.data));
      })
      .catch((err) => {
        return err;
      });
  };
}

export function addConfigUser(params) {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post('EnterpriseUsers/' , params)
        .then(res => {
          dispatch(configUserActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
