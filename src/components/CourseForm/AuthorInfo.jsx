import React from 'react';
import Button from '../Button/Button';
import styles from './CourseForm.module.scss';

const AuthorInfo = ({ name, btnText, btnVariant, onClick, testId }) => (
  <div data-testid={testId} className={styles.authorElement}>
    <p data-testid={`${testId}-authorName`}>{name}</p>
    <Button
      testId={`${testId}-${name}-btn`}
      buttonText={btnText}
      variant={btnVariant}
      onClick={onClick}
    />
  </div>
);

export default AuthorInfo;
