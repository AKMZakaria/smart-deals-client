import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <p>Loading</p>;

    // return <Navigate to={'/register'} replace></Navigate>;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location?.pathname} to={'/register'}></Navigate>;
};

export default PrivateRoute;
