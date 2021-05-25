import api from '../../utils/Http';
import { coaPrefixActions, globalActions } from '../../actions';

export function setCoaPrefix(params, url='') {
  const http = api('data');
  return dispatch => (
    new Promise((resolve, reject) => {
      http.post(url, params)
        .then(res => {
          dispatch(coaPrefixActions.setCoaPrefix(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
