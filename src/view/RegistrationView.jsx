import React from 'react';
import * as constants from '../utils/constants';
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
const {
  bEmail,
  bName,
  bPassword,
  bRegistartion,
  NAME_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} = constants;

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
          placeholderText={NAME_PLACEHOLDER}
        />
        <Input
          onChange={handleChange}
          value={inputValues.email}
          variant='green'
          name='email'
          labelText={bEmail}
          placeholderText={EMAIL_PLACEHOLDER}
        />
        <Input
          onChange={handleChange}
          value={inputValues.password}
          variant='green'
          name='password'
          labelText={bPassword}
          placeholderText={PASSWORD_PLACEHOLDER}
          type='password'
        />

        <Button type='submit' buttonText={bRegistartion} />
      </form>
    </LoginTemplate>
  );
};

export default RegistrationView;
