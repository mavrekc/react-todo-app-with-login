import Button from "./Button";

const Header = ({ showLogin, setShowLogin }) => {
	return (
      <header className="app-header">
		<h3 style={{ textAlign: 'center'}}>Add User</h3>
		<Button onClick={setShowLogin} text={showLogin ? 'Register' : 'Login'} />
      </header>
	);
};

export default Header;