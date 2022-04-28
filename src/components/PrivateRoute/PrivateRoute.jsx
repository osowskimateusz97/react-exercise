import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserInfo } from '../../features/authSlice';
import { ADMIN_ROLE } from '../../utils/constants';

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector(getUserInfo);
  return userInfo.role === ADMIN_ROLE ? (
    { children }
  ) : (
    <Navigate to='/courses' />
  );
};

export default PrivateRoute;
