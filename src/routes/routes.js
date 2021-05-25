import React from 'react';
import ConfigurePage from '../components/pages/ConfigurePage/';
import HomePage from '../components/pages/HomePage/';
import StartSetupPage from '../components/pages/StartSetupPage';
import EnterpriseListPage from '../components/pages/EnterprisePage/List';
import EnterpriseEditDetailPage from '../components/pages/EnterprisePage/Edit';
import EnterpriseNewDetailPage from '../components/pages/EnterprisePage/New';
import HealthCheckPage from '../components/pages/HealthCheckPage';
import ForbiddenPage from '../components/pages/ForbiddenPage';
import ReviewPage from '../components/pages/ReviewPage';
import LoginPage from '../components/pages/LoginPage';
import CompletePage from '../components/pages/CompletePage';
import UsersPage from '../components/pages/UsersPage';

const routes = [
  {
    path: '/',
    exact: true,
    auth: false,
    admin: false,
    title: '',
    main: (params) => <HomePage params={params} />
  },
  {
    path: '/login',
    exact: true,
    auth: false,
    admin: false,
    title: '',
    main: (params) => <LoginPage params={params} />
  },
  {
    path: '/configure/:code/:dtid?',
    exact: true,
    auth: true,
    admin: false,
    title: 'Configure',
    main: (params) => <ConfigurePage params={params} />
  },
  {
    path: '/welcome',
    exact: true,
    auth: true,
    admin: false,
    title: '',
    main: (params) => <StartSetupPage params={params} />
  },
  {
    path: '/workbooks/:name/:code/:dtid/:section?',
    exact: true,
    auth: true,
    admin: false,
    title: '',
    main: ''
  },
  {
    path: '/reviews/:name/:code/:dtid?',
    exact: true,
    auth: true,
    admin: false,
    title: '',
    main: (params) => <ReviewPage params={params} />
  },
  {
    path: '/complete/:name/:code/:dtid?',
    exact: true,
    auth: true,
    admin: false,
    title: '',
    main: (params) => <CompletePage params={params} />
  },
  {
    path: '/dashboard/:code/:dtid/:name?',
    exact: true,
    auth: true,
    admin: false,
    title: '',
    main: ''
  },
  {
    path: '/setup/enterprises',
    exact: true,
    auth: true,
    admin: true,
    title: 'Enterprise List',
    main: (params) => <EnterpriseListPage params={params} />
  },
  {
    path: '/admin',
    exact: true,
    auth: true,
    admin: true,
    title: 'Enterprise List',
    main: (params) => <EnterpriseListPage params={params} />
  },
  {
    path: '/add-new-admin',
    exact: true,
    auth: true,
    admin: true,
    title: 'Adding New Administrator',
    main: (params) => <UsersPage params={params} />
  },
  {
    path: '/setup/enterprises/edit/:id',
    exact: true,
    auth: true,
    admin: true,
    title: 'Enterprise Details',
    main: (params) => <EnterpriseEditDetailPage params={params} />
  },
  {
    path: '/setup/enterprises/add',
    exact: true,
    auth: true,
    admin: true,
    title: 'Enterprise Setup',
    main: (params) => <EnterpriseNewDetailPage params={params} />
  },
  {
    path: '/healthcheck',
    exact: true,
    auth: false,
    admin: false,
    title: 'Health Check',
    main: (params) => <HealthCheckPage params={params} />
  },
  {
    path: '/forbidden',
    exact: true,
    auth: false,
    admin: false,
    title: 'Forbidden Page',
    main: (params) => <ForbiddenPage params={params} />
  }
];

export default routes;
