import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {logoutUserRequest} from '../../store/reducers/authentication';
import {
  CatFact,
  fetchCatFactsRequest,
  getCatFacts,
  isLoadingCatFacts,
} from '../../store/reducers/cats';
import {ApplicationState} from '../../store/reducers/rootReducer';
import styles from './Home.module.scss';

interface DispatchProps {
  fetchCatFactsRequest: typeof fetchCatFactsRequest;
  logoutUserRequest: typeof logoutUserRequest;
}

interface StateProps {
  catFacts: ImmutableMap<CatFact>;
  isLoadingCatFacts: boolean;
}

export type HomeProps = DispatchProps & StateProps;

const Home: React.FC<HomeProps> = ({
  fetchCatFactsRequest,
  catFacts,
  isLoadingCatFacts,
  logoutUserRequest,
}) => {
  useEffect(() => {
    fetchCatFactsRequest({
      animal_type: 'cat',
      amount: 1,
    });
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <button onClick={logoutUserRequest}>Log out</button>
      </header>

      <h1>Home</h1>

      <p>
        {isLoadingCatFacts ? 'Loading...' : `Fact: ${catFacts.get('text')}`}
      </p>
    </div>
  );
};

export default connect(
  (state: ImmutableMap<ApplicationState>) => ({
    catFacts: getCatFacts(state),
    isLoadingCatFacts: isLoadingCatFacts(state),
  }),
  {
    fetchCatFactsRequest,
    logoutUserRequest,
  },
)(Home);
