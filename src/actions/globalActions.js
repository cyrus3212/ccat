/* ============
 * Global Actions
 * ============
 *
 * The actions that are available globally
 */

export function processError(err, reject) {
  const statusCode = ( typeof err !== 'undefined' && typeof err.response !== 'undefined') ? err.response.status : 500;
  const data = { error: null, statusCode };

  if ( typeof err.response !== 'undefined' && typeof err.response.data.message !== 'undefined' ) {
    data.error = err.response.data.message;
  } else if (statusCode === 400) {
    data.error = 'Bad Request! Please contact admin.';
  } else if (statusCode === 401) {
    data.error = 'Request failed with status code 401. Unauthorized!';
  } else if (statusCode === 403) {
    data.error = 'Forbidden! Please contact admin.';
  } else if (statusCode === 404) {
    data.error = 'API not found! Please contact admin.';
  } else if (statusCode === 405) {
    data.error = 'You are not allowed for this proccess!';
  } else if (statusCode === 412) {
    data.error = 'Something went wrong! Please contact admin.';
  } else if (statusCode === 503) {
    data.error = 'Service is temporarily unavailable! Please contact admin.';
  } else if (statusCode === 500) {
    data.error = 'Something went wrong! Please contact admin.';
  } else if (statusCode === 200) {
    data.error = 'Request has been proccessed but something went wrong! Please contact admin.';
  }
  return reject(data);
}
