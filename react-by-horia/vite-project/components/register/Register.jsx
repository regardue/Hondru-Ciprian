import { useState } from "react";
import { validationRules } from "../../../utils/validations/validation";

function Register() {
	const [form, setForm] = useState({
		email: "",
		firstName: "",
		lastName: "",
		age: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({
		email: null,
		firstName: null,
		lastName: null,
		age: null,
		password: null,
		confirmPassword: null,
	});
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		// console.log(name);
		// console.log(value);
		setForm({ ...form, [name]: value });
		validateFields(name, value);
	};

	const validateFields = (fieldName, inputValue) => {
		let newErrors = { ...errors };
		const validationResponse = validationRules[fieldName](inputValue);
		console.log("Validation Response");
		console.log(validationResponse);

		const NAMES_PATTERN = new RegExp(/^[^\d\s]+$/);
		// const EMAIL_REGEX = new RegExp(/\S+@\S+\.\S+/);

		// if (fieldName === "email") {
		// 	if (!inputValue) {
		// 		newErrors.email = "Email is required";
		// 		setIsFormValid(false);
		// 	} else if (!EMAIL_REGEX.test(inputValue)) {
		// 		newErrors.email = "Email is in the wrong format";
		// 		setIsFormValid(false);
		// 	} else {
		// 		newErrors.email = "";
		// 		// setIsFormValid(true);
		// 	}
		// }
		if (fieldName === "firstName") {
			if (!inputValue) {
				newErrors.firstName = "First Name is required";
				setIsFormValid(false);
			} else if (inputValue.length < 2) {
				newErrors.firstName = "First Name must have at least 2 charachters";
				setIsFormValid(false);
			} else if (!NAMES_PATTERN.test(inputValue)) {
				newErrors.firstName = "First name can't contain numbers";
				setIsFormValid(false);
			} else {
				newErrors.firstName = "";
				// setIsFormValid(true);
			}
		}
		if (fieldName === "lastName") {
			if (!inputValue) {
				newErrors.lastName = "Last Name is required";
				setIsFormValid(false);
			} else if (inputValue.length < 2) {
				newErrors.lastName = "Last Name must have at least 2 charachters";
				setIsFormValid(false);
			} else if (!NAMES_PATTERN.test(inputValue)) {
				newErrors.lastName = "Last name can't contain numbers";
				setIsFormValid(false);
			} else {
				newErrors.lastName = "";
				// setIsFormValid(true);
			}
		}
		if (fieldName === "age") {
			if (!inputValue) {
				newErrors.age = "Age is required";
				setIsFormValid(false);
			} else if (isNaN(inputValue)) {
				newErrors.age = "Age must be a number!";
				setIsFormValid(false);
			} else if (inputValue < 18) {
				newErrors.age = "Must be older than 18 years old!";
				setIsFormValid(false);
			} else if (inputValue > 100) {
				newErrors.age = "Must be younger than 100 years old!";
				setIsFormValid(false);
			} else {
				newErrors.age = "";
				// setIsFormValid(true);
			}
		}
		if (fieldName === "password") {
			if (!inputValue) {
				newErrors.password = "Password is required";
				setIsFormValid(false);
			} else {
				newErrors.password = "";
				// setIsFormValid(true);
			}
		}
		if (fieldName === "confirmPassword") {
			if (!inputValue) {
				newErrors.confirmPassword = "Confirm Password is required";
				setIsFormValid(false);
			} else if (inputValue !== form.password) {
				newErrors.confirmPassword = "Passwords do not match";
				setIsFormValid(false);
			} else {
				newErrors.confirmPassword = "";
				// setIsFormValid(true);
			}
		}
		const errorsArray = Object.values(newErrors);
		const isValid = errorsArray.every((value) => value === "");
		if (isValid) setIsFormValid(true);
		setErrors(newErrors);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isFormValid) return;
		console.log("Submitted form");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="login_input">
				<label>Email</label>
				<input
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
				/>
				<span>{errors.email && <p>{errors.email}</p>}</span>
			</div>
			<div className="login_input">
				<label>First Name</label>
				<input
					type="text"
					name="firstName"
					value={form.firstName}
					onChange={handleChange}
				/>
				<span>{errors.firstName && <p>{errors.firstName}</p>}</span>
			</div>
			<div className="login_input">
				<label>Last Name</label>
				<input
					type="text"
					name="lastName"
					value={form.lastName}
					onChange={handleChange}
				/>
				<span>{errors.lastName && <p>{errors.lastName}</p>}</span>
			</div>
			<div className="login_input">
				<label>Age</label>
				<input
					type="text"
					name="age"
					value={form.age}
					onChange={handleChange}
				/>
				<span>{errors.age && <p>{errors.age}</p>}</span>
			</div>
			<div className="login_input">
				<label>Password</label>
				<input
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
				/>
				<span>{errors.password && errors.password}</span>
			</div>
			<div className="login_input">
				<label>Confirm Password</label>
				<input
					type="password"
					name="confirmPassword"
					value={form.confirmPassword}
					onChange={handleChange}
				/>
				<span>{errors.confirmPassword && <p>{errors.confirmPassword}</p>}</span>
			</div>
			<button type="submit">Sign up</button>
		</form>
	);
}

export default Register;
