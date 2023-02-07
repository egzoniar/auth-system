import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MButton } from "../components/Buttons";

import useAuth from "../hooks/useAuth";

const Register = () => {
	const { onRegister } = useAuth();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleFirstNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
	const handleLastNameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
	const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
	const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		onRegister({firstName, lastName, email, password});
	}

	return (
		<div>
			<h1 className="text-4xl mb-5">Register</h1>
			<form action="" onSubmit={handleOnSubmit} className="flex flex-col gap-6 items-center">
				<div className="flex flex-col gap-2">
					<input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" autoFocus required />
					<input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" required />
					<input type="email" placeholder="Email" value={email} onChange={handleEmailOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" required />
					<input type="password" placeholder="Password" value={password} onChange={handlePasswordOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" required />
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