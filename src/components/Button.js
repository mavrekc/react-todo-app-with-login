const Button = ({ onClick, text }) => {
	return (
		<button className="login-btn" onClick={onClick}>{text}</button>
	);
};

export default Button;