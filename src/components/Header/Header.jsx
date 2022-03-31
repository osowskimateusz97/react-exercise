import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import Button from '../Button/Button';
import Logo from '../Logo';
import styles from './Header.module.scss';

const Header = () => {
	const { user, signout } = useAuth();
	return (
		<div className={styles.header}>
			<Link to='/' style={{ height: '100%' }}>
				<Logo />
			</Link>
			<div className={styles.header__info}>
				<p>{user.name}</p>
				<Button buttonText='Logout' onClick={signout} />
			</div>
		</div>
	);
};

export default Header;
