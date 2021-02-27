import {Switch, Route} from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import Unauthorized from './containers/Unauthorized';
import AuthRoute from './utils/AuthRoute';
import NoAuthRoute from './utils/NoAuthRoute';
import ScrollToTop from './utils/ScrollToTop';

export enum PublicRoutes {
  login = '/login',
  notFound = 'not-found',
  unauthorized = 'unauthorized',
}

export enum AuthRoutes {
  home = '/',
}

const routes = (
  <>
    <ScrollToTop />
    <Switch>
      <AuthRoute exact path={AuthRoutes.home} Component={Home} />
      <Route exact path={PublicRoutes.login} component={Login} />
      <Route path={PublicRoutes.unauthorized} component={Unauthorized} />
      <Route path={PublicRoutes.notFound} component={NotFound} />
      <NoAuthRoute />
    </Switch>
  </>
);

export default routes;
