const hasOnlyNumbers = (number) => {
	for (let i = 0; i < number.length; i++) {
		if (isNaN(number[i])) {
			return false;
		}
	}
	return true;
}

const checkEmail = (emailInput) => {
	// console.log(emailInput);
	let email = emailInput.trim();
	let hasAtFirst = email.indexOf('@');
	let hasAtSecond = email.indexOf('@', hasAtFirst + 1);
	let dotIndex = email.indexOf('.', hasAtFirst + 1);
	let hasDotExt = dotIndex != -1 ? email.slice(dotIndex + 1, email.length) != '' && email.slice(dotIndex + 1, email.length).length <= 20 : email.slice(0, email.length) != '';
	// let hasDotCom = email.endsWith('.com');
	let firstStringEmpty = hasAtFirst != -1 ? email.slice(0, hasAtFirst) != '' : email.slice(0, dotIndex);
	let secondStringEmpty = hasAtFirst != -1 ? email.slice(hasAtFirst + 1, dotIndex !== -1 ? dotIndex : email.length) : email.slice(0, dotIndex !== -1 ? dotIndex : email.length);

	// console.log(hasAtFirst, hasAtSecond, hasDotExt, firstStringEmpty, secondStringEmpty);
	return hasAtFirst != -1 && hasAtSecond == -1 && dotIndex !== -1 && hasDotExt && firstStringEmpty && secondStringEmpty;
}

const checkEmailRevised = (emailInput) => {
	console.log(emailInput);
	let email = emailInput.trim();
	let hasAtFirst = email.indexOf('@');
	let hasAtSecond = email.indexOf('@', hasAtFirst + 1);
	let dotIndex = email.indexOf('.', hasAtFirst + 1);
	let hasDotExt = dotIndex != -1 ? email.slice(dotIndex + 1, email.length) != '' && email.slice(dotIndex + 1, email.length).length <= 20 : email.slice(0, email.length) != '';
	// let hasDotCom = email.endsWith('.com');
	// let firstStringEmpty = hasAtFirst != -1 ? email.slice(0, hasAtFirst) != '' : email.slice(0, dotIndex);
	// let secondStringEmpty = hasAtFirst != -1 ? email.slice(hasAtFirst + 1, email.indexOf('.com')) : email.slice(0, email.indexOf('.com'));

	let firstString;
	let secondString;
	if (hasAtFirst !== -1 && dotIndex !== -1) {
		firstString = email.slice(0, hasAtFirst);
		secondString = email.slice(hasAtFirst + 1, dotIndex);
		console.log(firstString, secondString);
	}
	else if (hasAtFirst === -1 && dotIndex !== -1) {
		firstString = email.slice(0, dotIndex);
		secondString = email.slice(0, dotIndex);
		console.log(firstString, secondString);
	}

	else if (hasAtFirst !== -1 && dotIndex === -1) {
		firstString = email.slice(0, hasAtFirst);
		secondString = email.slice(hasAtFirst + 1, email.length);
		console.log(firstString, secondString);
	}

	else {
		firstString = email;
		secondString = email;
		console.log(firstString, secondString);
	}

	const firstStringEmpty = firstString !== '';
	const secondStringEmpty = secondString !== '';

	console.log(hasAtFirst, hasAtSecond, hasDotExt, firstStringEmpty, secondStringEmpty);
	return hasAtFirst != -1 && hasAtSecond == -1 && dotIndex !== -1 && hasDotExt && firstStringEmpty && secondStringEmpty;
}

const passwordValidation = (password) => {
	const minValue = 8;
	console.log('password length: ', password.length);
	console.log('password: ', password);
	if (password.length < minValue) {
		return [false, 'password is less than 8 characters'];
	}
	else {
		return [true, ''];
	}
}

const passwordMatch = (password, confirmPassword) => {
	console.log(password, confirmPassword);
	if ((password !== confirmPassword || confirmPassword === '') && !(password.length < 8)) {
		return [false, 'password dont match'];
	}
	else {
		return [true, ''];
	}
}

const dateValidation = (date) => {
	// const dateRegex = /^(0?[1-9	]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
	
	if (date !== '') {
		// dateMsg.classList.remove('error');
		// dateMsg.innerHTML = '';
		// console.log('date is not empty', date);
		const newDate = new Date(date);
		const year = newDate.getFullYear();
		// console.log(newDate, year);

		if (year) {
			// console.log('year valid');
			if ((year >= 2000 && year <= 2024)) {
				return [true, ''];
			}
			else if (year < 2000) {
				return [false, 'date is less than 2000'];
			}
			else if (year > 2024)  {
				return [false,'date is greater than 2024'];
			}
		}
	}
	else {
		return [false, 'date is not complete'];
	}

}

const contactValidation = (number) => {
	// const phoneRegex = /^03\d{2}-\d{7}$/;
	const minValue = 11;
	// console.log(number.length);

	if (!(number.length > minValue || number.length < minValue) && hasOnlyNumbers(number)) {
		return [true, ''];
	}
	else {
		return [false, 'number is not valid'];
	}
}

// const validateRadioButtons = (radioButtons) => {
//     let isChecked = false;
//     for (const radioButton of radioButtons) {
//         if (radioButton.checked) {
//             isChecked = true;
//             break;
//         }
//     }
//     if (isChecked) {
//         radioMsg.classList.remove('error');
//         radioMsg.innerHTML = '';
// 		radioContainer.classList.remove('radioContainer');
//         return true;
//     } else {
//         radioMsg.classList.add('error');
//         radioMsg.innerHTML = 'Please select a gender';
// 		radioContainer.classList.add('radioContainer');
//         return false;
//     }
// }

export {
	checkEmail,
	checkEmailRevised,
	passwordValidation,
	passwordMatch,
	dateValidation,
	contactValidation
};