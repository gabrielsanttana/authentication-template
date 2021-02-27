import React, {useEffect} from 'react';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Authentication | Not found';
  }, []);

  return (
    <div className={styles.container}>
      <p>Not found</p>
    </div>
  );
};

export default NotFound;
