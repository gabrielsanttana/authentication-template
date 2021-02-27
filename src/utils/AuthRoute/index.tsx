import React from 'react';
import {connect} from 'react-redux';
import {Route, RouteComponentProps} from 'react-router';
import {Redirect} from 'react-router-dom';
import {PublicRoutes} from '../../routes';
import {isAdmin, isAuthed, isStaff} from '../../store/reducers/authentication';
import {ApplicationState} from '../../store/reducers/rootReducer';

export type UserRoles = 'admin' | 'staff' | 'nonAdmin';

interface StateProps {
  isAuthed?: boolean;
  isStaff?: boolean;
  isAdmin?: boolean;
  location?: any;
}

interface OwnProps {
  component: React.FC<any>;
  path: string;
  exact?: boolean;
  requiredRoles?: UserRoles[];
}

type AuthRouteProps = OwnProps & StateProps;

const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  path,
  exact = false,
  requiredRoles,
  isAuthed,
  isStaff,
  isAdmin,
}) => {
  const userRole = isAdmin ? 'admin' : isStaff ? 'staff' : 'nonAdmin';
  const userHasRequiredRole = requiredRoles?.includes(userRole) ?? true;
  const allowAccess = isAuthed && userHasRequiredRole;

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) => {
        if (!isAuthed)
          return (
            <Redirect
              to={{
                pathname: PublicRoutes.login,
              }}
            />
          );

        if (allowAccess) return <Component {...props} />;

        return (
          <Redirect
            to={{
              pathname: PublicRoutes.unauthorized,
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
}))(AuthRoute);
