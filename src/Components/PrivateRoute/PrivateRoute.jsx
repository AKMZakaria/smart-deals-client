import React, { use } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = use(AuthContext);
  //   const navigate = useNavigate();

  if (!user) {
    return <Navigate to={'/register'} replace></Navigate>;
  }

  return children;
};

export default PrivateRoute;
