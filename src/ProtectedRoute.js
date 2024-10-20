import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ authState }) => {

	// const { authState } = useContext(AuthContext);

	console.log("inside protected route", authState);

	return authState !== null ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;