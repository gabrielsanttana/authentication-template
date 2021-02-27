import './App.scss';
import {History} from 'history';
import {ConnectedRouter} from 'connected-react-router/immutable';
import routes from './routes';

interface AppProps {
  history: History;
}

const App: React.FC<AppProps> = ({history}) => {
  return (
    <ConnectedRouter history={history} noInitialPop>
      {routes}
    </ConnectedRouter>
  );
};

export default App;
