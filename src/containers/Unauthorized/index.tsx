import React, {useEffect} from 'react';
import styles from './Unauthorized.module.scss';

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Authentication | Unauthorized';
  }, []);

  return (
    <div className={styles.container}>
      <p>Unauthorized</p>
    </div>
  );
};

export default NotFound;
