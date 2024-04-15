import React from 'react';
import { Route, Navigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem('tokenkey')

  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
