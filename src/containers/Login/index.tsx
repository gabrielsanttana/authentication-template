import React, {FormEvent} from 'react';
import styles from './Login.module.scss';

const Login: React.FC = () => {
  const login = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={login}>
        <input type="email" autoFocus placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />

        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
