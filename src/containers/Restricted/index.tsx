import React, {useEffect} from 'react';
import styles from './Restricted.module.scss';

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Authentication | Forbidden';
  }, []);

  return (
    <div className={styles.container}>
      <p>Restricted</p>
    </div>
  );
};

export default NotFound;
