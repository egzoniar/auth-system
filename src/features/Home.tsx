import { useQuery } from "react-query";
import { fetchCategories } from "../api/joke-third-party-API";
import { MButton, HomeItemLink } from "../components/Buttons";
import useAuth from "../hooks/useAuth";

const Home = () => {
	const { onLogout } = useAuth();

	useQuery("jokeCategories", fetchCategories);

	return (
		<div className="flex flex-col gap-6 items-center">
			<h1 className="text-4xl">Home</h1>

			<div className="flex flex-col items-start shadow-inner text-base min-w-[40vw] bg-gray-200 text-gray-600 rounded-[5px] p-3">
				<HomeItemLink to="/me" title="User Details" />
				<HomeItemLink to="/joke" title="Joke Generator" />
			</div>
			
			<MButton title="Sign Out" onClick={onLogout} />
		</div>
	);
}

export default Home;