import api from '../../utils/Http';
import { serviceSectionActions, globalActions } from '../../actions';

export function getServiceSection(url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url)
        .then(res => {
          dispatch(serviceSectionActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function addServiceSection(params, url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post(url, params)
        .then(res => {
          dispatch(serviceSectionActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function removeService(params, url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.delete(url, {data: params})
        .then(res => {
          dispatch(serviceSectionActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
