import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Login } from '../pages/Login';
import SignUp from '../pages/SignUp';

const PrivateRoutes = ({ children }) => {
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const location = useLocation();
  const Data = location.pathname || "/";

  if (!isAuth) {
    return <Navigate to="/login" replace state={ Data } />;
  }
  return children;
};

const AllRoutes = () => {
  return (
    <Routes>
        
      <Route path="/verify" element={
        <PrivateRoutes>
          {/* <Cart /> */}
        </PrivateRoutes>
      } />
      <Route path="*" element={<h3>Page Not Found !</h3>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    
    </Routes>
  )
}

export default AllRoutes