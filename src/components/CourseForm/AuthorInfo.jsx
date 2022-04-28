import React from 'react';
import Button from '../Button/Button';
import styles from './CourseForm.module.scss';

const AuthorInfo = ({ name, btnText, btnVariant, onClick }) => (
  <div className={styles.authorElement}>
    <p>{name}</p>
    <Button buttonText={btnText} variant={btnVariant} onClick={onClick} />
  </div>
);

export default AuthorInfo;
