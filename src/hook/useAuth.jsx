import { createContext, useContext, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import {
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
} from '../utils/localStorage';

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

const useProvideAuth = () => {
	const [user, setUser] = useState(getUserFromLocalStorage());
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const signin = async (data) => {
		try {
			const res = await API.post('/login', data);
			const { user } = res.data;
			setUser(user);
			localStorage.setItem('user', JSON.stringify(user));
			navigate('/');
		} catch (err) {
			showErrorMsg(err);
		}
	};

	const showErrorMsg = (err) => {
		// it returns array because login/register view map through it to display error msg
		const errMsg = err.response.data.errors || [err.response.data.result];
		setError(errMsg);
	};

	const signup = async (data) => {
		try {
			await API.post('/register', data);
			const { name, email } = data;
			setUser({ name, email });
			localStorage.setItem('user', JSON.stringify({ name, email }));
			navigate('/');
		} catch (err) {
			showErrorMsg(err);
		}
	};
	const signout = () => {
		setUser(null);
		removeUserFromLocalStorage();
		navigate('/login');
	};

	return {
		user,
		error,
		setError,
		signin,
		signup,
		signout,
	};
};
