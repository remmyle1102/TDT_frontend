import React from 'react';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import LoginPage from 'pages/LoginPage';

// pages
import AuditPage from 'pages/AuditPage';
import AdministratorPage from 'pages/AdministratorPage';
import HostInventoryPage from 'pages/HostInventoryPage';
import PlayBookPage from 'pages/PlayBookPage';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import axios from 'axios';


function App() {
  axios.interceptors.request.use(function(config) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('currentUser');
    return config
  });
    return (
      <BrowserRouter>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={LoginPage}
            />
            <LayoutRoute
              exact
              path="/"
              layout={MainLayout}
              component={AuditPage}
            />
            <LayoutRoute
              exact
              path="/audit"
              layout={MainLayout}
              component={AuditPage}
            />
            <LayoutRoute
              exact
              path="/inventory"
              layout={MainLayout}
              component={HostInventoryPage}
            />
            <LayoutRoute
              exact
              path="/administrator"
              layout={MainLayout}
              component={AdministratorPage}
            />
            <LayoutRoute
              exact
              path="/playbook"
              layout={MainLayout}
              component={PlayBookPage}
            />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );

}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
