import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
	checkEmail,
	// checkEmailRevised,
	// passwordValidation,
	// passwordMatch,
	// dateValidation,
	// contactValidation
} from './Validation';

// import { AuthContext } from '../AuthContext';

const LoginForm = ({ addUser, checkUserExists, authState, setAuthState }) => {

	const [formValid, setFormValid] = useState(false);
	const [submitValue, setSubmitValue] = useState('');
	const [firstSubmit, setFirstSubmit] = useState(false);
	const [userExists, setUserExists] = useState(false);
	const [errors, setErrors] = useState({});
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// const { authState, setAuthState } = useContext(AuthContext);

	const navigate = useNavigate();

	// [✓] - FUNCTION TO BE CALLED IF THERE ARE NO ERRORS DURING SUBMISSION
	const altChange = (e) => {
		const { name, value } = e.target;

		if ([name] == 'email') {
			setEmail(value);
		}
		else {
			setPassword(value);
		}
	}

	// [✓] - FUNCTION TO BE CALLED IF THERE ARE ERRORS DURING FORM SUBMISSION
	// [✓] - ALSO UPDATES ERRORS BASED ON THE INPUT VALUE VALIDATION
	const handleChange = (e) => {
		const { name, value } = e.target;

		if ([name] == 'email') {
			setEmail(value);
		}
		else {
			setPassword(value);
		}

		switch (name) {
			case 'email':
				if (!checkEmail(value)) {
					setErrors({ ...errors, email: 'email not valid'});
				}
				else {
					setErrors({ ...errors, email: ''});
				}
				break;

			default:
				break;
		}
	};	


	const submitHandler = (e) => {
		e.preventDefault();
		const formErrors = {};
		const userData = {
			email: email,
			password: password
		}

		console.log(userData)

		// [✓] - PERFORM VALIDATIONS ON ALL INPUT VALUES
		const emailValid = checkEmail(userData.email);
		// const [passwordValid, passwordMsg] = passwordValidation(userData.password);

		// [✓] - CHECK IF ALL FIELDS ARE VALIDATED
		if (emailValid) {

			// [✓] - SET FORM SUBMISSION MESSAGE - EMPTY - SINCE FORM WAS VALIDATED
			setSubmitValue('');

			// [✓] - CHECK IF USER EXISTS FROM THE GLOBAL STATE OF THE PARENT
			// [✓] - WHERE USERS ARE SAVED
			if (!(addUser(userData)[0])) {
				setUserExists(true);
				console.log(addUser(userData))
				console.log('user is not logged in')
				setTimeout(() => setUserExists(false), 2000);
				// alert(`User with this email => "${userData.email}" already exists`);
			}
			else {
				// [✓] - USER DOESN'T EXIST AND NO ERRORS
				// [✓] - PROCEED TO ADD USER
				// [✓] - RESET ERRORS
				// setUserExists(false);
				console.log('user is logged in');
				userData['name'] = addUser(userData)[1];
				console.log(userData);


				setErrors({});
				setFormValid(true);
				// addUser(userData);

				setEmail('');
				setPassword('');

				setTimeout(() => setFormValid(false), 2000);
				setFirstSubmit(false);


				setTimeout(() => {

					setAuthState({ email: userData.email });

					const usersFromStorage = JSON.parse(localStorage.getItem('users'));

					const userFound = usersFromStorage.find((item) => item.email === userData.email );

					localStorage.setItem('login', JSON.stringify({ email: userData.email, fName: userFound.fName, lName: userFound.lName }));

					navigate('/task', { state: userData })

				}, 1000);

				// console.log(typeof setAuthState);

			}
		}
		else {


			// [✓] SET MESSAGE FOR FORM NOT SUBMITTED
			setSubmitValue('Form was not submitted');
			setTimeout(() => setSubmitValue(''), 2000);

			// [✓] SET ERRORS FOR THE RELEVANT INPUT FIELDS
			formErrors["email"] = emailValid ? '' : 'email not valid';
			// formErrors["password"] = passwordValid ? '' : passwordMsg;

			// [-] TEST
			console.log(formErrors);
			setErrors(formErrors);
			// alert('Form was not submitted');

			// [✓] RESET MESSAGE VARIABLES
			// [✓] ALSO SET DYNAMIC ON CHANGE ERRORR CHECKING
			setFirstSubmit(true);
			setFormValid(false);
		}

	};


	return (

		<section className="content">
			<div id="snackbar" style={userExists ? { backgroundColor: 'rgb(193, 55, 34)'} : {}} className={formValid || userExists ? 'show' : ''}>{formValid ? 'User Logged In' : 'Invalid Credentials'}</div>
			<form id="my-form" onSubmit={submitHandler}>

				<span className={`msg ${(errors.email === '' || errors.email === undefined) ? '' : 'msg-after' }`} id="emailMsg">{errors.email}</span>

				<div>
					<label htmlFor="email">Email:</label>
					<input type="text" id="email" name="email" value={email} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<span className={`msg ${(errors.password === '' || errors.password === undefined) ? '' : 'msg-after' }`} id="pwdMsg">{errors.password}</span>

				<div>
					<label htmlFor="pwd">Password:</label>
					<input type="password" id="pwd" name="password" value={password} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<span className={`msg ${formValid ? 'success' : '' }`} id="formMsg">{formValid ? 'Login Successful' : '' }</span>
				<span className={`msg ${userExists ? 'error' : '' }`} id="formMsg">{userExists ? 'Invalid Credentials' : '' }</span>
				{submitValue !== '' && <span className='msg error'id="formMsg">{submitValue}</span>}
				
				<input className="button" type="submit" value="Login"/>

			</form>
		</section>
	);
};

export default LoginForm;