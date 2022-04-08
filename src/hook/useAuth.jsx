import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectionErr } from '../utils/constants';
import { useLoginMutation, useRegisterMutation } from '../services/user';
import { getUserInfo, signOut } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

const useProvideAuth = () => {
	const user = useSelector(getUserInfo);
	const dispatch = useDispatch();
	const [login] = useLoginMutation();
	const [register] = useRegisterMutation();
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const signin = async (data) => {
		try {
			await login(data).unwrap();
			navigate('/');
		} catch (err) {
			console.error('err', err);
			showErrorMsg(err);
		}
	};

	const showErrorMsg = (err) => {
		// it returns array because login/register view map through it to display error msg
		const errMsg = err.data.errors || [
			err.response.data.result || connectionErr,
		];
		setError(errMsg);
	};

	const signup = async (data) => {
		try {
			await register(data).unwrap();
			navigate('/');
		} catch (err) {
			console.error('err', err);
			showErrorMsg(err);
		}
	};
	const signout = () => {
		dispatch(signOut());
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
