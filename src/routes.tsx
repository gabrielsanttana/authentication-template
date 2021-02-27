import {Switch, Route} from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import Unauthorized from './containers/Unauthorized';
import AuthRoute from './utils/AuthRoute';
import NoAuthRoute from './utils/NoAuthRoute';
import Restricted from './containers/Restricted';
import ScrollToTop from './utils/ScrollToTop';

export enum PublicRoutes {
  login = '/login',
  notFound = '/not-found',
  unauthorized = '/unauthorized',
}

export enum AuthRoutes {
  home = '/',
  restricted = '/restricted',
}

const routes = (
  <>
    <ScrollToTop />
    <Switch>
      <AuthRoute exact path={AuthRoutes.home} component={Home} />
      <AuthRoute
        exact
        path={AuthRoutes.restricted}
        component={Restricted}
        requiredRoles={['admin']}
      />

      <Route path={PublicRoutes.login} component={Login} />
      <Route path={PublicRoutes.unauthorized} component={Unauthorized} />
      <Route path={PublicRoutes.notFound} component={NotFound} />

      <NoAuthRoute />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default routes;
