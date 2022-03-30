import React from 'react';
import logo from '../assets/logo.svg';

const Logo = ({ closeCreator }) => (
	<img onClick={closeCreator} src={logo} alt='logo' />
);

export default Logo;
