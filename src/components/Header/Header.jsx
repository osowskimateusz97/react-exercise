import React from 'react';
import Button from '../Button/Button';
import Logo from '../Logo';
import styles from './Header.module.scss';

const Header = ({ closeCreator }) => {
	return (
		<div className={styles.header}>
			<Logo closeCreator={closeCreator} />
			<div className={styles.header__info}>
				<p>Matthew</p>
				<Button buttonText='Logout' />
			</div>
		</div>
	);
};

export default Header;
