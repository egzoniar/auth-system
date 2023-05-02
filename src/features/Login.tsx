import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { MButton } from "../components/Buttons";
import useAuth from "../hooks/useAuth";

const Login = () => {
	const { onLogin } = useAuth();

	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(emailInput.current) emailInput.current.value = e.target.value;
	}
	const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(passwordInput.current) passwordInput.current.value = e.target.value;
	}

	const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if(!emailInput.current || !passwordInput.current) {
				return;
			}

			onLogin({ 
				email: emailInput.current.value, 
				password: passwordInput.current.value 
			});
		}
		catch (err) {
			console.log(err);
		}
	}

	return (
		<div>
			<h1 className="text-4xl mb-5">Login</h1>
			<form onSubmit={handleOnSubmit} className="flex flex-col gap-6 items-center">
				<div className="flex flex-col gap-2">
					<input ref={emailInput} type="email" autoFocus placeholder="Email" onChange={handleEmailOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" required />
					<input ref={passwordInput} type="password" placeholder="Password" onChange={handlePasswordOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" required />
					<p className="text-xs inline-flex pl-1">
						Don't have an account?&nbsp;
						<NavLink to="/register" className="inline-flex items-center font-bold text-blue-600 dark:text-blue-500 hover:underline">
							Register
						</NavLink>
					</p>
				</div>
				<MButton title="Submit" type="submit" />
			</form>
		</div>
	);
}

export default Login;