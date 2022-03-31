import React from 'react';
import { bEmail, bPassword } from '../utils/constants';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import LoginTemplate from '../template/LoginTemplate/LoginTemplate';
import { Link } from 'react-router-dom';
import useForm from '../hook/useForm';
import { useAuth } from '../hook/useAuth';

const initialValue = {
	email: '',
	password: '',
};

const LoginView = () => {
	const [inputValues, handleChange] = useForm(initialValue);
	const { signin, error } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		signin(inputValues);
	};

	return (
		<LoginTemplate>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<Input
					onChange={handleChange}
					value={inputValues.email}
					variant='green'
					labelText={bEmail}
					name='email'
					placeholderText='Enter email'
				/>
				<Input
					onChange={handleChange}
					value={inputValues.password}
					type='password'
					name='password'
					variant='green'
					labelText={bPassword}
					placeholderText='Enter password'
				/>
				{error ? <p>{error}</p> : null}
				<Button type='submit' buttonText='Login' />
			</form>
			<p>
				If you not have an account you can <Link to='/'>Registration</Link>
			</p>
		</LoginTemplate>
	);
};

export default LoginView;
