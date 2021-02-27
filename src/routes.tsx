import {Switch, Route} from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import AuthRoute from './utils/AuthRoute';
import ScrollToTop from './utils/ScrollToTop';

export enum PublicRoutes {
  login = '/login',
  notFound = 'not-found',
  unauthorized = 'unauthorized',
}

export enum AuthRoutes {
  home = '/',
}

const routes = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <AuthRoute exact path={AuthRoutes.home} Component={Home} />
        <Route exact path={PublicRoutes.login} component={Login} />
      </Switch>
    </>
  );
};

export default routes;
