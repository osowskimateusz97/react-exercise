import React from 'react';
import * as constants from '../utils/constants';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import LoginTemplate from '../template/LoginTemplate/LoginTemplate';
import useForm from '../hook/useForm';
import { useAuth } from '../hook/useAuth';

const initialValue = {
  email: '',
  password: '',
};

const { bEmail, bLogin, bPassword, EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER } =
  constants;

const LoginView = () => {
  const [inputValues, handleChange] = useForm(initialValue);
  const { signin } = useAuth();

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
          placeholderText={EMAIL_PLACEHOLDER}
        />
        <Input
          onChange={handleChange}
          value={inputValues.password}
          type='password'
          name='password'
          variant='green'
          labelText={bPassword}
          placeholderText={PASSWORD_PLACEHOLDER}
        />
        <Button type='submit' buttonText={bLogin} />
      </form>
    </LoginTemplate>
  );
};

export default LoginView;
