import React, { useEffect } from 'react';
import { useAuth } from '../../hook/useAuth';
import styles from './LoginTemplate.module.scss';

const LoginTemplate = ({ children }) => {
	const { setError } = useAuth();
	useEffect(() => {
		setError(null);
	}, [setError]);

	return <div className={styles.wrapper}>{children}</div>;
};

export default LoginTemplate;
