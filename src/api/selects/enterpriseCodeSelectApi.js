import api from '../../utils/Http';
import { enterpriseCodeSelectActions, globalActions } from '../../actions';

export function getEnterpriseCodesSelect(inputVal) {
  const http = api();
  let url = `ExternalEnterprises/${inputVal}`;
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url)
        .then(res => {
          dispatch(enterpriseCodeSelectActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
