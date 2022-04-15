import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROLE, connectionErr } from '../utils/constants';
import {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useUserInfoMutation,
} from '../services/user';
import { getUserInfo } from '../features/authSlice';
import { useSelector } from 'react-redux';

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
	const [login] = useLoginMutation();
	const [fetchUserInfo] = useUserInfoMutation();
	const [register] = useRegisterMutation();
	const [logout] = useLogoutMutation();
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const isAdmin = user.role === ADMIN_ROLE;

	const signin = async (data) => {
		try {
			await login(data).unwrap();
			await fetchUserInfo();
			navigate('/');
		} catch (err) {
			showErrorMsg(err);
			console.error('err', err);
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
			navigate('/login');
		} catch (err) {
			showErrorMsg(err);
			console.error('err', err);
		}
	};
	const signout = async () => {
		try {
			await logout().unwrap();
			navigate('/login');
		} catch (err) {
			console.error('Problem with logout!', err);
		}
	};

	return {
		user,
		error,
		setError,
		signin,
		signup,
		signout,
		isAdmin,
	};
};
