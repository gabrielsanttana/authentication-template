import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import ScrollToTop from './utils/ScrollToTop';

export enum PublicRoutes {
  home = '/',
  login = '/login',
  notFound = 'not-found',
  unauthorized = 'unauthorized',
}

export enum AuthRoutes {}

const routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path={PublicRoutes.home} component={Home} />
        <Route exact path={PublicRoutes.login} component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
