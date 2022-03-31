import React from 'react';
import { bEmail, bName, bPassword, bRegistartion } from '../utils/constants';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import LoginTemplate from '../template/LoginTemplate/LoginTemplate';
import useForm from '../hook/useForm';
import { useAuth } from '../hook/useAuth';

const initialValue = {
	name: '',
	email: '',
	password: '',
};

const RegistrationView = () => {
	const [inputValues, handleChange] = useForm(initialValue);
	const { signup } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		signup(inputValues);
	};

	return (
		<LoginTemplate>
			<h1>Registration</h1>
			<form onSubmit={handleSubmit}>
				<Input
					onChange={handleChange}
					value={inputValues.name}
					name='name'
					variant='green'
					labelText={bName}
					placeholderText='Enter name'
				/>
				<Input
					onChange={handleChange}
					value={inputValues.email}
					variant='green'
					name='email'
					labelText={bEmail}
					placeholderText='Enter email'
				/>
				<Input
					onChange={handleChange}
					value={inputValues.password}
					variant='green'
					name='password'
					labelText={bPassword}
					placeholderText='Enter password'
					type='password'
				/>

				<Button type='submit' buttonText={bRegistartion} />
			</form>
		</LoginTemplate>
	);
};

export default RegistrationView;
