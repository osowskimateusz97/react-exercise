import React from 'react';
import styles from './Loader.module.scss';
import { ReactComponent as LoaderIcon } from '../../assets/loader.svg';

const Loader = () => (
  <div data-testid='loader' className={styles.loader}>
    <LoaderIcon />
  </div>
);

export default Loader;
