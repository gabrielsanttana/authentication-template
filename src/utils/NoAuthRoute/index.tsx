import {is} from 'immutable';
import React from 'react';
import {connect} from 'react-redux';
import {RouteProps} from 'react-router';
import {Redirect, Route, RouteComponentProps} from 'react-router-dom';
import NotFound from '../../containers/NotFound';
import {AuthRoutes, PublicRoutes} from '../../routes';
import {isAdmin, isAuthed, isStaff} from '../../store/reducers/authentication';
import {ApplicationState} from '../../store/reducers/rootReducer';

interface StateProps {
  isAuthed?: boolean;
  isAdmin: boolean;
  isStaff: boolean;
}

interface OwnProps {
  location?: RouteProps['location'];
  requiredRoles?: any[];
  exact?: boolean;
}

const NoAuthRoute: React.FC<StateProps & OwnProps> = ({
  isAuthed,
  isAdmin,
  isStaff,
  location,
  requiredRoles,
  exact,
}) => {
  const userRole = isAdmin ? 'admin' : isStaff ? 'staff' : 'nonAdmin';
  const userHasRequiredRole = requiredRoles?.includes(userRole);
  const isUnauthorized = isAuthed && !userHasRequiredRole;
  const renderPageNotFound =
    !Object.values(AuthRoutes).includes(location?.pathname as AuthRoutes) ||
    !Object.values(PublicRoutes).includes(location?.pathname as PublicRoutes);

  return (
    <Route
      exact={exact}
      render={() => {
        if (renderPageNotFound) return <NotFound />;

        if (isUnauthorized)
          return (
            <Redirect
              to={{
                pathname: PublicRoutes.unauthorized,
              }}
            />
          );

        if (!isAuthed)
          return (
            <Redirect
              to={{
                pathname: PublicRoutes.login,
                state: {
                  requestedPath: location?.pathname,
                },
              }}
            />
          );
      }}
    />
  );
};

export default connect((state: ApplicationState) => ({
  isAuthed: isAuthed(state),
  isStaff: isStaff(state),
  isAdmin: isAdmin(state),
}))(NoAuthRoute);
