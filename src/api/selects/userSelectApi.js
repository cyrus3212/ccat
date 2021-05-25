import api from '../../utils/Http';
import { userSelectActions, globalActions } from '../../actions';

export function getUsersSelect(enterpriseCode, inputVal) {
  let urlParams = enterpriseCode ? `&enterpriseCode=${enterpriseCode}` : '';
  let url = `ExternalUsers?&searchVal=${inputVal}${urlParams}`;

  // let url = `ExternalUsers/${enterpriseCode}/${inputVal}`;

  const http = api();
  return dispatch => (
    new Promise((resolve, reject) => {
      http.get(url)
        .then(res => {
          dispatch(userSelectActions.list(res.data));
          return resolve();
        })
        .catch((err) => globalActions.processError(err, reject));
    })
  );
}
