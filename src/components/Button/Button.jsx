import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = ({ buttonText, onClick, className, type, variant, testId }) => {
  const btnStyle = clsx({
    [styles.button]: true,
    [styles[variant]]: variant,
    [className]: className,
  });
  return (
    <button
      type={type || 'button'}
      className={btnStyle}
      onClick={onClick}
      data-testid={testId}
    >
      {buttonText}
    </button>
  );
};

export default Button;
