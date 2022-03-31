import React from 'react';
import logo from '../assets/logo.svg';

const Logo = ({ onClick }) => <img onClick={onClick} src={logo} alt='logo' />;

export default Logo;
