import api from '../utils/Http';
import { adminUserActions, globalActions } from '../actions';

export function getAdminUser(url='EnterpriseUsers/AdminUsers') {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url)
        .then(res => {
          dispatch(adminUserActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function addAdminUser(params) {
  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post('EnterpriseUsers?isAdmin=true', params)
        .then(res => {
          dispatch(adminUserActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function removeAdminUser(params, url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.delete(url, {data: params})
        .then(res => {
          dispatch(adminUserActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
