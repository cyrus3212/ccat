import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import routes from './routes';
import AdminRoute from './adminRoute';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import { checkAccessToken } from '../utils/Auth/Auth';
import api from '../utils/Http';

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <Switch>
      {routes.map((route, index) => {
        if (route.auth) {
          if (route.admin) {
            return <AdminRoute key={index} {...route} />;
          }
          return <PrivateRoute key={index} {...route} />;
        }
        return <PublicRoute key={index} {...route} />;
      })}
    </Switch>
  </Router>
);

export default Routes;
