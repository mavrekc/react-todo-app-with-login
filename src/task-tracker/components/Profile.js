import { useState } from 'react';

import {
	checkEmail,
	// checkEmailRevised,
	passwordValidation,
	passwordMatch,
	dateValidation,
	contactValidation
} from './../../components/Validation';
import { useEffect } from 'react';

const Form = ({ addUser, checkUserExists, users, setShowLogin, user, updateUser}) => {
	// const [fName, setFName] = useState('');
	// const [lName, setLName] = useState('');
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [confirm, setConfirm] = useState('');
	// const [, setFName] = useState('');
	// const [fName, setFName] = useState('');
	// const [fName, setFName] = useState('');
	// const [fName, setFName] = useState('');
	const [userDetails, setUserDetails] = useState(() => {
		const usersFromStorage = JSON.parse(localStorage.getItem('users'));

		const currentUser = usersFromStorage.find((item) => item.email === user.email);

		return currentUser;
	});
	const [file, setFile] = useState(null);
	const [letUpdate, setLetUpdate] = useState(false);
	const [formValid, setFormValid] = useState(false);
	const [submitValue, setSubmitValue] = useState('');
	const [firstSubmit, setFirstSubmit] = useState(false);
	const [userExists, setUserExists] = useState(false);
	const [errors, setErrors] = useState({});
	const [userData, setUserData] = useState(() => {
		const usersFromStorage = JSON.parse(localStorage.getItem('users'));

		const currentUser = usersFromStorage.find((item) => item.email === user.email);

		return currentUser;
	});


	useEffect(() => {
		setErrors({});
	}, [letUpdate])

	// [✓] - FUNCTION TO BE CALLED IF THERE ARE NO ERRORS DURING SUBMISSION
	const altChange = async (e) => {
		console.log("alt change invoked", firstSubmit);

		const { name, value } = e.target;

		console.log(`target value for ${name}`, e)
		
		if (name === 'image') {
	
			const file = e.target.files[0];

			const reader = new FileReader();

			reader.readAsDataURL(file);


			reader.onload = () => {
				console.log(reader.result);
				console.log(typeof reader.result);

				const fileObject = {
					name: file.name,
					type: file.type,
					size: file.size,
					lastModified: file.lastModified,
					data: reader.result
				};
				
				setUserData((prevUserData) => ({ ...prevUserData, [name]: fileObject }))
			}

			// console.log(file.data);
			// const arrayBuffer = await file.arrayBuffer();



			// const fileObjectURL = URL.createObjectURL(fileObject);

			// console.log(fileObject)
			// console.log(fileObjectURL)
			// console.log(typeof e.target.files[0])

			// setUserData((prevUserData) => ({ ...prevUserData, [name]: fileObject, imageUrl: fileObjectURL}))
		}
		else {
			setUserData((prevUserData) => ({ ...prevUserData, [name]: value}));
		}
	}

	const checkFileImage = (e) => {

		const file = e.target.files[0];

		if (!file.type.startsWith("image/")) {
			setErrors({ ...errors, file: 'you can only upload image'})
			return;
		}
		else {
			setErrors({
				...errors,
				file: ''
			})
			const fileURL = URL.createObjectURL(file);

			console.log(fileURL)
			console.log(file)

			setFile(fileURL);

			altChange({ target: {
				name: 'file',
				value: fileURL
			}})

		}
	}

	// [✓] - FUNCTION TO BE CALLED IF THERE ARE ERRORS DURING FORM SUBMISSION
	// [✓] - ALSO UPDATES ERRORS BASED ON THE INPUT VALUE VALIDATION
	const handleChange = async (e) => {
		const { name, value } = e.target;
		console.log(value);

		console.log("handle change invoked", firstSubmit);

		if (name === 'image') {

			const file = e.target.files[0];

			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = () => {
				const fileObject = {
					name: file.name,
					type: file.type,
					size: file.size,
					lastModified: file.lastModified,
					data: reader.result
				};

				// console.log(reader.result);

				setUserData((prevUserData) => ({ ...prevUserData, [name]: fileObject }))
			}

			// console.log(file.data);
			// const arrayBuffer = await file.arrayBuffer();



			// const arrayBuffer = await file.arrayBuffer();

			// console.log(file.data);
			// const fileObject = {
			// 	name: file.name,
			// 	type: file.type,
			// 	size: file.size,
			// 	lastModified: file.lastModified,
			// 	data: arrayBuffer
			// };
			// setUserData((prevUserData) => ({ ...prevUserData, [name]: fileObject, imageUrl: URL.createObjectURL(file)}))
		}
		else {
			setUserData((prevUserData) => ({ ...prevUserData, [name]: value}));

		}

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
			case 'image':
				if (e.target.files[0].type.startsWith("image/")) {
					setErrors({ ...errors, image: ''})
				}
				else {
					setErrors({ ...errors, image: 'file needs to be an image'})
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
		const [dateValid, dateMsg] = dateValidation(userData.date);
		const [numberValid, numberMsg] = contactValidation(userData.number);
		const gender = userData.gender !== '';
		// const isImage = userData.image ? userData.image.type !== '' && userData.image.type.startsWith("image/") : true;
		const isImage = (userData.image !== undefined && userData.image !== null) ?  userData.image.type.startsWith("image/") : true;

		// [✓] - CHECK IF ALL FIELDS ARE VALIDATED
		if (firstField && secondField && emailValid && dateValid && numberValid && gender && isImage) {

			// [✓] - SET FORM SUBMISSION MESSAGE - EMPTY - SINCE FORM WAS VALIDATED
			setSubmitValue('');

			// setUserExists(false);
			setErrors({});
			setFormValid(true);

			const usersFromStorage = JSON.parse(localStorage.getItem("users"));

			const currentUser = usersFromStorage.find((item) => item.email === userDetails.email);

			const updatedUser = { ...currentUser, ...userData};

			const updatedUserList = usersFromStorage.map((item) => {
				return item.email === updatedUser.email ? updatedUser : item;

			});

			localStorage.setItem("users", JSON.stringify(updatedUserList));

			setUserDetails(JSON.parse(localStorage.getItem("users")).find((item) => item.email === user.email))

			updateUser();

			setLetUpdate(false);

			// addUser(userData);
			// console.log(users);
			// setUserData({
			// 	fName: '',
			// 	lName: '',
			// 	email: '',
			// 	date: '',
			// 	number: '',
			// 	address: '',
			// 	gender: ''
			// });
			setTimeout(() => setFormValid(false), 2000);
			setFirstSubmit(false);
			// setTimeout(() => setShowLogin(true), 500);
		}
		else {
			// [✓] SET MESSAGE FOR FORM NOT SUBMITTED
			setSubmitValue('Changes were not made');
			setTimeout(() => setSubmitValue(''), 2000);

			// [✓] SET ERRORS FOR THE RELEVANT INPUT FIELDS
			formErrors["fName"] = firstField ? '' : 'first name should not be empty';
			formErrors["lName"] = secondField ? '' : 'last name should not be empty';
			formErrors["email"] = emailValid ? '' : 'email not valid';
			formErrors["date"] = dateValid ? '' : dateMsg;
			formErrors["number"] = numberValid ? '' : numberMsg;
			formErrors["gender"] = gender ? '' : 'gender not selected';
			formErrors["image"] = isImage ? '' : 'file needs to be an image';

			// [-] TEST
			console.log(formErrors);
			setErrors(formErrors);
			// alert('Form was not submitted');

			// [✓] RESET MESSAGE VARIABLES
			// [✓] ALSO SET DYNAMIC ON CHANGE ERROR CHECKING
			setFirstSubmit(true);
			setFormValid(false);
		}

	};


	return (

		<section className="content">
			<form id="my-form" onSubmit={submitHandler}>

				{!letUpdate && <button type='button' className="btn btn-sm btn-dark update-user-btn" onClick={() => setLetUpdate(!letUpdate)}>Update Information</button>}
				<span className={`msg ${(errors.fName === '' || errors.fName === undefined) ? '' : 'msg-after' }`} id="firstMsg">{errors.fName}</span>
				<div>
					<label htmlFor="fname">First Name:</label>
					<input type="text" className='outline' id="fname" name="fName" value={userData.fName} disabled={!letUpdate} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<span className={`msg ${(errors.lName === '' || errors.lName === undefined) ? '' : 'msg-after' }`} id="firstMsg">{errors.lName}</span>

				<div>
					<label htmlFor="lname">Last Name:</label>
					<input type="text" id="lname" name="lName" value={userData.lName} disabled={!letUpdate} onChange={firstSubmit ? handleChange : altChange}/>
				</div>
				
				<span className={`msg ${(errors.email === '' || errors.email === undefined) ? '' : 'msg-after' }`} id="emailMsg">{errors.email}</span>

				<div>
					<label htmlFor="email">Email:</label>
					<input type="text" id="email" name="email" value={userData.email} disabled={true} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				{/* <span className={`msg ${(errors.password === '' || errors.password === undefined) ? '' : 'msg-after' }`} id="pwdMsg">{errors.password}</span>

				<div>
					<label htmlFor="pwd">Password:</label>
					<input type="password" id="pwd" name="password" value={userDetails.password} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<span className={`msg ${(errors.match === '' || errors.match === undefined) ? '' : 'msg-after' }`} id="matchMsg">{errors.match}</span>

				<div>
					<label htmlFor="cnfrm">Confirm Password:</label>
					<input type="password" id="cnfrm" name="confirm" value={userDetails.confirm} onChange={firstSubmit ? handleChange : altChange}/>
				</div> */}

				<span className={`msg ${(errors.date === '' || errors.date === undefined) ? '' : 'msg-after' }`} id="dateMsg">{errors.date}</span>

				<div>
					<label htmlFor="date">Date:</label>
					<input type="date" id="date" name="date" value={userData.date} disabled={!letUpdate} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<span className={`msg ${(errors.number === '' || errors.number === undefined) ? '' : 'msg-after' }`} id="phoneMsg">{errors.number}</span>

				<div>
					<label htmlFor="telNo">Phone number:</label>
					<input id="telNo" type="tel" name="number" placeholder="xxxxxxxxxxx" value={userData.number} disabled={!letUpdate} onChange={firstSubmit ? handleChange : altChange}/>
				</div>

				<div>
					<label htmlFor="address">Address:</label>
					<textarea id="address" cols="47" rows="5" name="address" style={{ fontSize: '14px'}} value={userData.address} disabled={!letUpdate} onChange={firstSubmit ? handleChange : altChange}></textarea>
				</div>

				<span className={`msg ${(errors.gender === '' || errors.gender === undefined) ? '' : 'msg-after' }`} id="radioMsg">{errors.gender}</span>

				<div className="space">

					<label htmlFor="gender">Gender:</label>

					<div id="radioContainer">

						<input type="radio" name="gender" id="male" value="male" checked={userData.gender !== '' && userData.gender === 'male' ? true : false } disabled={!letUpdate} onChange={firstSubmit ? handleChange : altChange}/>

						<label htmlFor="male" style={{ display: 'inline-block', marginTop: '4px', marginBottom: '4px', marginLeft: '10px'}}>Male</label>

						<input type="radio" name="gender" id="female" value="female" checked={userData.gender !== '' && userData.gender === 'female' ? true : false } disabled={!letUpdate} onChange={firstSubmit ? handleChange : altChange} style={{ marginLeft: '25%' }}/>

						<label htmlFor="female" style={{ display: 'inline-block', marginTop: '4px', marginBottom: '4px', marginLeft: '10px' }}>Female</label><br/>

					</div>
				</div>

				<span className={`msg ${(errors.image === '' || errors.image === undefined) ? '' : 'msg-after' }`} id="radioMsg">{errors.image}</span>

				<div className="input-group mb-3"  >
					<input type="file" className="form-control" id="inputGroupFile02" disabled={!letUpdate} name='image' onChange={firstSubmit ? handleChange : altChange}></input>
				</div>

				<span className={`msg ${formValid ? 'success' : '' }`} id="formMsg">{formValid ? 'User Saved' : '' }</span>
				<span className={`msg ${userExists ? 'error' : '' }`} id="formMsg">{userExists ? 'User Already Exists' : '' }</span>
				{submitValue !== '' && <span className='msg error'id="formMsg">{submitValue}</span>}
				
				{letUpdate && <input className="update-button" type="submit" value="Update"/>}

			</form>
		</section>
	);
};

export default Form;