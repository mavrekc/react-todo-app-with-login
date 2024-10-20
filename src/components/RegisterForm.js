import { useState } from 'react';

import {
	checkEmail,
	// checkEmailRevised,
	passwordValidation,
	passwordMatch,
	dateValidation,
	contactValidation
} from './Validation';

const Form = ({ addUser, checkUserExists, users, setShowLogin }) => {
	// const [fName, setFName] = useState('');
	// const [lName, setLName] = useState('');
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [confirm, setConfirm] = useState('');
	// const [, setFName] = useState('');
	// const [fName, setFName] = useState('');
	// const [fName, setFName] = useState('');
	// const [fName, setFName] = useState('');
	const [formValid, setFormValid] = useState(false);
	const [submitValue, setSubmitValue] = useState('');
	const [firstSubmit, setFirstSubmit] = useState(false);
	const [userExists, setUserExists] = useState(false);
	const [errors, setErrors] = useState({});
	const [userData, setUserData] = useState({
		fName: '',
		lName: '',
		email: '',
		password: '',
		confirm: '',
		date: '',
		number: '',
		address: '',
		gender: ''
	});

	// [✓] - FUNCTION TO BE CALLED IF THERE ARE NO ERRORS DURING SUBMISSION
	const altChange = (e) => {
		const { name, value } = e.target;

		setUserData((prevUserData) => ({ ...prevUserData, [name]: value}));
	}

	// [✓] - FUNCTION TO BE CALLED IF THERE ARE ERRORS DURING FORM SUBMISSION
	// [✓] - ALSO UPDATES ERRORS BASED ON THE INPUT VALUE VALIDATION
	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(value);

		setUserData((prevUserData) => ({ ...prevUserData, [name]: value}));

		switch (name) {
			case 'fName':
				if (value === '') {
					setErrors({ ...errors, fName: 'first name should not be empty'});
				}
				else {
					setErrors({ ...errors, fName: ''});
				}
				break;

			case 'lName':
				if (value === '') {
					setErrors({ ...errors, lName: 'last name should not be empty'});
				}
				else {
					setErrors({ ...errors, lName: ''});
				}
				break;

			case 'email':
				if (!checkEmail(value)) {
					setErrors({ ...errors, email: 'email not valid'});
				}
				else {
					setErrors({ ...errors, email: ''});
				}
				break;

			case 'password':		
				const passwordMsg = passwordValidation(value)[1];
				setErrors({ ...errors, password: passwordMsg});
				break;

			case 'confirm':
				const matchMsg = passwordMatch(userData.password, value)[1];
				setErrors({...errors, match: matchMsg});
				break;

			case 'date':
				const dateMsg = dateValidation(value)[1];
				setErrors({...errors, date: dateMsg});
				break;

			case 'number':
				const numberMsg = contactValidation(value)[1];
				setErrors({...errors, number: numberMsg});
				break;

			case 'gender':
				console.log(value);
				if (value === '') {
					setErrors({...errors, gender: 'gender not selected'});
				}
				else {
					setErrors({...errors, gender: ''});
				}
				break;
			default:
				break;
		}
	};


	const submitHandler = (e) => {
		e.preventDefault();
		const formErrors = {};

		// [✓] - PERFORM VALIDATIONS ON ALL INPUT VALUES
		const firstField = userData.fName !== '';
		const secondField = userData.lName !== '';
		const emailValid = checkEmail(userData.email);
		const [passwordValid, passwordMsg] = passwordValidation(userData.password);
		const [doPasswordMatch, matchMsg] = passwordMatch(userData.password, userData.confirm);
		console.log(doPasswordMatch);
		const [dateValid, dateMsg] = dateValidation(userData.date);
		const [numberValid, numberMsg] = contactValidation(userData.number);
		const gender = userData.gender !== '';

		// [✓] - CHECK IF ALL FIELDS ARE VALIDATED
		if (firstField && secondField && emailValid && passwordValid && doPasswordMatch && dateValid && numberValid && gender) {

			// [✓] - SET FORM SUBMISSION MESSAGE - EMPTY - SINCE FORM WAS VALIDATED
			setSubmitValue('');

			// [✓] - CHECK IF USER EXISTS FROM THE GLOBAL STATE OF THE PARENT
			// [✓] - WHERE USERS ARE SAVED
			if (checkUserExists(userData)) {
				setUserExists(true);
				setTimeout(() => setUserExists(false), 2000);
				// alert(`User with this email => "${userData.email}" already exists`);
			}
			else {
				// [✓] - USER DOESN'T EXIST AND NO ERRORS
				// [✓] - PROCEED TO ADD USERS
				// [✓] - RESET ERRORS
				// setUserExists(false);
				setErrors({});
				setFormValid(true);
				addUser(userData);
				console.log(users);
				setUserData({
					fName: '',
					lName: '',
					email: '',
					password: '',
					confirm: '',
					date: '',
					number: '',
					address: '',
					gender: ''
				});
				setTimeout(() => setFormValid(false), 2000);
				setFirstSubmit(false);
				setTimeout(() => setShowLogin(true), 500);
			}
		}
		else {
			// [✓] SET MESSAGE FOR FORM NOT SUBMITTED
			setSubmitValue('Form was not submitted');
			setTimeout(() => setSubmitValue(''), 2000);

			// [✓] SET ERRORS FOR THE RELEVANT INPUT FIELDS
			formErrors["fName"] = firstField ? '' : 'first name should not be empty';
			formErrors["lName"] = secondField ? '' : 'last name should not be empty';
			formErrors["email"] = emailValid ? '' : 'email not valid';
			formErrors["password"] = passwordValid ? '' : passwordMsg;
			formErrors["match"] = doPasswordMatch ? '' : matchMsg;
			formErrors["date"] = dateValid ? '' : dateMsg;
			formErrors["number"] = numberValid ? '' : numberMsg;
			formErrors["gender"] = gender ? '' : 'gender not selected';

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
			<form id="my-form" onSubmit={submitHandler}>

				<span className={`msg ${(errors.fName === '' || errors.fName === undefined) ? '' : 'msg-after' }`} id="firstMsg">{errors.fName}</span>

				<div>
					<label htmlFor="fname">First Name:</label>
					<input type="text" className='outline' id="fname" name="fName" value={userData.fName} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<span className={`msg ${(errors.lName === '' || errors.lName === undefined) ? '' : 'msg-after' }`} id="firstMsg">{errors.lName}</span>

				<div>
					<label htmlFor="lname">Last Name:</label>
					<input type="text" id="lname" name="lName" value={userData.lName} onChange={firstSubmit ? handleChange : altChange}/>
				</div>
				
				<span className={`msg ${(errors.email === '' || errors.email === undefined) ? '' : 'msg-after' }`} id="emailMsg">{errors.email}</span>

				<div>
					<label htmlFor="email">Email:</label>
					<input type="text" id="email" name="email" value={userData.email} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<span className={`msg ${(errors.password === '' || errors.password === undefined) ? '' : 'msg-after' }`} id="pwdMsg">{errors.password}</span>

				<div>
					<label htmlFor="pwd">Password:</label>
					<input type="password" id="pwd" name="password" value={userData.password} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<span className={`msg ${(errors.match === '' || errors.match === undefined) ? '' : 'msg-after' }`} id="matchMsg">{errors.match}</span>

				<div>
					<label htmlFor="cnfrm">Confirm Password:</label>
					<input type="password" id="cnfrm" name="confirm" value={userData.confirm} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<span className={`msg ${(errors.date === '' || errors.date === undefined) ? '' : 'msg-after' }`} id="dateMsg">{errors.date}</span>

				<div>
					<label htmlFor="date">Date:</label>
					<input type="date" id="date" name="date" value={userData.date} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<span className={`msg ${(errors.number === '' || errors.number === undefined) ? '' : 'msg-after' }`} id="phoneMsg">{errors.number}</span>

				<div>
					<label htmlFor="telNo">Phone number:</label>
					<input id="telNo" type="tel" name="number" placeholder="xxxxxxxxxxx" value={userData.number} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<div>
					<label htmlFor="address">Address:</label>
					<textarea id="address" cols="47" rows="5" name="address" value={userData.address} onChange={firstSubmit ? handleChange : altChange}></textarea>
				</div>

				<span className={`msg ${(errors.gender === '' || errors.gender === undefined) ? '' : 'msg-after' }`} id="radioMsg">{errors.gender}</span>

				<div className="space">

					<label htmlFor="gender">Gender:</label>

					<div id="radioContainer">

						<input type="radio" name="gender" id="male" value="male" checked={userData.gender !== '' && userData.gender === 'male' ? true : false } onChange={firstSubmit ? handleChange : altChange}/>

						<label htmlFor="male" style={{ display: 'inline-block', marginTop: '4px', marginBottom: '4px', marginLeft: '10px'}}>Male</label>

						<input type="radio" name="gender" id="female" value="female" checked={userData.gender !== '' && userData.gender === 'female' ? true : false } onChange={firstSubmit ? handleChange : altChange} style={{ marginLeft: '25%' }}/>

						<label htmlFor="female" style={{ display: 'inline-block', marginTop: '4px', marginBottom: '4px', marginLeft: '10px' }}>Female</label><br/>

					</div>
				</div>

				<span className={`msg ${formValid ? 'success' : '' }`} id="formMsg">{formValid ? 'User Saved' : '' }</span>
				<span className={`msg ${userExists ? 'error' : '' }`} id="formMsg">{userExists ? 'User Already Exists' : '' }</span>
				{submitValue !== '' && <span className='msg error'id="formMsg">{submitValue}</span>}
				
				<input className="button" type="submit" value="Register"/>

			</form>
		</section>
	);
};

export default Form;