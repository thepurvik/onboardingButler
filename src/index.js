import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/Contexts/AuthContexts';
import { Auth0Provider } from '@auth0/auth0-react';
import { API_BASE_URLS } from './assets/Helper/constant';
// import history from './utils/history';

const onRedirectCallback = (appState) => {
  // history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};
const providerConfig = {
  domain: 'dev-xl4j55ir.us.auth0.com',
  clientId: 'l4ofMfliLRmlVTVK3ci4V9oyu1DzkjZv',
  organization: 'org_gvBvGFt77KBeaRPK',
  // redirectUri: 'http://localhost:3000/poc/callback',
  redirectUri:
    window.location.hostname?.split('.')?.[0] === `${API_BASE_URLS.hostname}` || window.location.hostname?.split('.')?.[0] === 'localhost'
      ? window.location.origin + '/callback'
      : window.location.origin + '/loginsso',
  scope: 'openid profile email',
  onRedirectCallback,
};
ReactDOM.render(
  <Auth0Provider {...providerConfig}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
