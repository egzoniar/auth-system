import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MButton } from "../components/Buttons";
import useAuth from "../hooks/useAuth";

const Login = () => {
	const { onLogin } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
	const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

	const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			onLogin({ email, password });
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
					<input type="email" autoFocus placeholder="Email" value={email} onChange={handleEmailOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" required />
					<input type="password" placeholder="Password" value={password} onChange={handlePasswordOnChange} className="py-1 px-3 rounded-md font-extralight bg-slate-200" required />
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