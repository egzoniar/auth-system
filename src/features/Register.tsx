import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { MButton } from "../components/Buttons";

import useAuth from "../hooks/useAuth";

const Register = () => {
	const { onRegister } = useAuth();

	const firstNameInput = useRef<HTMLInputElement>(null);
	const lastNameInput = useRef<HTMLInputElement>(null);
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	const handleFirstNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(firstNameInput.current) firstNameInput.current.value = e.target.value;
	}
	const handleLastNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(lastNameInput.current) lastNameInput.current.value = e.target.value;
	}
	const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(emailInput.current) emailInput.current.value = e.target.value;
	}
	const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(passwordInput.current) passwordInput.current.value = e.target.value;
	}

	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if(
			!firstNameInput.current || !lastNameInput.current 
			|| !emailInput.current || !passwordInput.current
		) {
			return;
		}

		onRegister({
			firstName: firstNameInput.current.value, 
			lastName: lastNameInput.current.value,
			email: emailInput.current.value,
			password: passwordInput.current.value
		});
	}

	return (
		<div>
			<h1 className="text-4xl mb-5">Register</h1>
			<form action="" onSubmit={handleOnSubmit} className="flex flex-col gap-6 items-center">
				<div className="flex flex-col gap-2">
					<input ref={firstNameInput} type="text" placeholder="First Name" onChange={handleFirstNameOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" autoFocus required />
					<input ref={lastNameInput} type="text" placeholder="Last Name" onChange={handleLastNameOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" required />
					<input ref={emailInput} type="email" placeholder="Email" onChange={handleEmailOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" required />
					<input ref={passwordInput} type="password" placeholder="Password" onChange={handlePasswordOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" required />
					<p className="text-xs inline-flex pl-1">
						Already have an account?&nbsp;
						<NavLink to="/login" className="inline-flex items-center font-bold text-blue-600 dark:text-blue-500 hover:underline">
							Login
						</NavLink>
					</p>
				</div>
				<MButton title="Submit" type="submit" />
			</form>
		</div>
	);
}

export default Register;