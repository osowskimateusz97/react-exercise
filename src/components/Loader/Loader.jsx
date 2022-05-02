import React from 'react';
import styles from './Loader.module.scss';
import { ReactComponent as LoaderIcon } from '../../assets/loader.svg';

const Loader = ({ testId = 'loader' }) => (
  <div data-testid={testId} className={styles.loader}>
    <LoaderIcon />
  </div>
);

export default Loader;
