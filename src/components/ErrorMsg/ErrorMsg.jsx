import React from 'react';
import styles from './ErrorMsg.module.scss';

const ErrorMsg = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<p>{children}</p>
		</div>
	);
};

export default ErrorMsg;
