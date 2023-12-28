import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Login } from "../pages/Login";
import SignUp from "../pages/SignUp";
import VerifyAuth from "../pages/VerifyAuth";
import { useToast } from "@chakra-ui/react";

const PrivateRoutes = ({ children }) => {
  const toast = useToast();
  const isAuth = useSelector((store) => store.isAuth);
  const location = useLocation();
  const Data = location.pathname || "/";

  if (!isAuth) {
    toast({
      position: "top",
      title: "This is a authenticated route. You have to login first !",
      status: "error",
      duration: 1500,
      isClosable: true,
    });
    return <Navigate to="/login" replace state={Data} />;
  }
  return children;
};

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/verify"
        element={
          <PrivateRoutes>
            <VerifyAuth />
          </PrivateRoutes>
        }
      />
      <Route path="*" element={<h3>Page Not Found !</h3>} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<SignUp />} />
    </Routes>
  );
};

export default AllRoutes;
