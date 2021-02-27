import React, {FormEvent} from 'react';
import {connect} from 'react-redux';
import {ApplicationState} from '../../store/reducers/rootReducer';
import {Redirect} from 'react-router-dom';
import styles from './Login.module.scss';

interface StateProps {
  isAuthed: boolean;
}

const Login: React.FC<StateProps> = ({isAuthed}) => {
  const loginUser = (event: FormEvent) => {
    event.preventDefault();
  };

  if (isAuthed) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={loginUser}>
        <input type="email" autoFocus placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />

        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default connect((state: ApplicationState) => ({
  isAuthed: true,
}))(Login);
