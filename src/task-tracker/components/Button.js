const Button = ({ onClick, text, children }) => {
	return (
		<button className={text === 'Logout' ? 'logout-btn dropdown-item' : 'show-btn dropdown-item'} onClick={onClick}>
			{children}
			{text}
		</button>
	);
};

export default Button;