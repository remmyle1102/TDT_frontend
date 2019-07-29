import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from 'services/authenticationService';

const PrivateLayoutRoute = ({
  component: Component,
  layout: Layout,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = authenticationService.currentUser;
      if (!currentUser) {
        return (
          // not logged in so redirect to login page with the return url

          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }
      // authorised so return component
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default PrivateLayoutRoute;
