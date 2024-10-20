// import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import Button from "./Button";
// import { AuthContext } from "../../AuthContext";
// import { useContext } from "react";

const Footer = ({ authState, setAuthState }) => {
	const location = useLocation();
	// const navigate = useNavigate();

	// const { authState, setAuthState } = useContext(AuthContext);

	// const logout = () => {
	// 	console.log('Logging Out: ', authState);
	// 	setAuthState(null);
	// 	localStorage.setItem('login', JSON.stringify(null));
	// 	navigate('/');
	// };

	return (
		// <div style={{ position: 'relative'}}>
			<footer className="task-footer">
				{location.pathname === '/' ? (
					<>
						{/* <Button onClick={logout} text="Logout"/> */}
						<p>Copyright &copy; 2024</p>
						{/* <Link to="/about">Route to About Page</Link>  */}
					</>
				) : (
					<>
						{/* <Button onClick={logout} text="Logout"/> */}
						<p>Copyright &copy; 2024</p>
					</>
				)}
				
			</footer>
		// </div>
	);
};


export default Footer;
