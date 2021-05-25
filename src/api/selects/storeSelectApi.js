import api from '../../utils/Http';
import { storeSelectActions, globalActions } from '../../actions';

export function getStoresSelect(interpriseId, inputVal) {
  const http = api();
  let url = `ExternalStores/${interpriseId}/${inputVal}`;
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url)
        .then(res => {
          dispatch(storeSelectActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
