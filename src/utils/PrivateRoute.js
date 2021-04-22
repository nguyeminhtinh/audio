// @flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  component: any,
  isAuthenticated: boolean,
  path: string,
};

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  path,
  ...rest
}: Props) => {
  const servicePath = '/login';
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated || (!isAuthenticated && servicePath === path) ? (
          <Component path={path} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: servicePath,
            }}
          />
        )
      }
    />
  );
};

export default React.memo<Props>(PrivateRoute);
