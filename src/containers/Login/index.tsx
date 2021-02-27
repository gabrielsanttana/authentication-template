import React, {ChangeEvent, FormEvent, useState} from 'react';
import {connect} from 'react-redux';
import {ApplicationState} from '../../store/reducers/rootReducer';
import {Redirect} from 'react-router-dom';
import styles from './Login.module.scss';
import {isAuthed, loginUserRequest} from '../../store/reducers/authentication';

interface DispatchProps {
  loginUserRequest: typeof loginUserRequest;
}

interface StateProps {
  isAuthed: boolean;
}

const Login: React.FC<StateProps & DispatchProps> = ({
  isAuthed,
  loginUserRequest,
}) => {
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
    nextRoute: '/',
  });

  const loginUser = (event: FormEvent) => {
    event.preventDefault();

    loginUserRequest(loginFormData);
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setLoginFormData({...loginFormData, [name]: value});
  };

  if (isAuthed) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={loginUser}>
        <legend>Authentication</legend>

        <input
          name="username"
          type="email"
          autoFocus
          placeholder="Enter your email"
          onChange={handleFormChange}
          value={loginFormData.username}
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleFormChange}
          value={loginFormData.password}
        />

        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => ({
    isAuthed: isAuthed(state),
  }),
  {
    loginUserRequest,
  },
)(Login);
