import { getBridgeConfig } from './bridgeConfig';
import AuthClient from '@bridge/auth-js';

const BRIDGE_CONFIG = getBridgeConfig();
const authClient = new AuthClient({
  env: BRIDGE_CONFIG.environment,
  clientId: BRIDGE_CONFIG.clientID,
  redirectUrl: BRIDGE_CONFIG.redirectUri,
  scopes: BRIDGE_CONFIG.scopes,
});

export function authLogin () {
  return authClient.startInteractiveAuth();
}

export function checkAccessToken()
{
  // Perform renewAuth if user logged out or expire token
  return authClient.getAuth()
    .then((result) => {
      setSession(result);
      return result;
    })
    .catch(function(err) {
      if (err.code === 'LOGIN_REQUIRED') {
        // Send the user to login page
        return authLogin();
      }
      console.error(err);
      throw err;
    });
}

export function authLogout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('userRole');
  window.top.location.href = BRIDGE_CONFIG.logoutUrl;
}

export function setSession(authResult) {

  const token = parseJwt(authResult);

  const retrievalTime = new Date(token.iat * 1000);

  retrievalTime.setMinutes(retrievalTime.getMinutes() + 13);

  // Set the time that the access token will expire at
  const expiresAt = JSON.stringify(retrievalTime);
  localStorage.setItem('access_token', authResult);
  localStorage.setItem('expires_at', expiresAt);
}

export function isAuthenticated() {
  // Check whether the current time is past the
  // access token's expiry time
  const expiresAt = JSON.parse(localStorage.getItem('expires_at')) || 0;
  const _expiresAt = new Date(expiresAt);

  return _expiresAt.getTime() < Date.now();
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
