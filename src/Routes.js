import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Task from './task-tracker/Task';
import { AuthContext } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function Root() {
	const [authState, setAuthState] = useState(() => {
		return JSON.parse(localStorage.getItem('login')) !== null ? JSON.parse(localStorage.getItem('login')) : null
	});


	// useEffect(() => {
	// 	setLoggedIn(JSON.parse(localStorage.getItem('login')));
	// }, [])

	// const updateLoggedIn = () => {
	// 	setLoggedIn(true);
	// }

	// const getAuth = () => {
	// 	return JSON.parse(localStorage.getItem('login'));
	// }
	useEffect(() => {
		localStorage.setItem('login', JSON.stringify(authState));
	}, [])

	const setAuth = (value) => {
		setAuthState()
	}

	// useEffect(() => {
	// 	localStorage.setItem('login', JSON.stringify(authState))
	// }, [authState])

  return (

	// <AuthContext.Provider value={{ authState, setAuthState }}>
	<Routes>
		{/* {console.log(authState)} */}
		{authState === null ? (
			<Route path="/" element={<App authState={authState} setAuthState={setAuthState}/>} />
		) : (
			// <Route element={<ProtectedRoute authState={authState}/>} >
			<Route path="/task" element={<Task authState={authState} setAuthState={setAuthState}/>} />
			// </Route>
		)}
		{/* <Route path="*" element={authState === null ? <App authState={authState} setAuthState={setAuthState} /> : <Task authState={authState} setAuthState={setAuthState} />}  /> */}
		<Route path="*" element={authState === null ? <Navigate to="/" /> : <Navigate to="/task" />}  />
	</Routes>
	// </AuthContext.Provider>
  )
};

export default Root;