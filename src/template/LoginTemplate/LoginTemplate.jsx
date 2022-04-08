import React, { useEffect } from 'react';
import { useAuth } from '../../hook/useAuth';
import styles from './LoginTemplate.module.scss';
import { Link, useLocation } from 'react-router-dom';
import ErrorMsg from './ErrorMsg';

const LoginTemplate = ({ children }) => {
	let { pathname } = useLocation();
	const { setError, error } = useAuth();

	useEffect(() => {
		setError(null);
	}, [setError]);
	const path = pathname === '/registration' ? 'login' : 'registration';

	return (
		<div className={styles.wrapper}>
			<>
				{children}
				{error ? <ErrorMsg className={styles.error} error={error} /> : null}
				<p>
					If you not have an account you can <Link to={`/${path}`}>{path}</Link>
				</p>
			</>
		</div>
	);
};

export default LoginTemplate;
