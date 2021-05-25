import api from '../../utils/Http';
import { partsSectionActions, globalActions } from '../../actions';

export function getPartsSection(url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url)
        .then(res => {
          dispatch(partsSectionActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function addPartsSection(params, url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post(url, params)
        .then(res => {
          dispatch(partsSectionActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}

export function removeParts(params, url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.delete(url, {data: params})
        .then(res => {
          dispatch(partsSectionActions.fetch(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
