import { useState } from 'react';
import { useQuery } from "react-query";
import { BsArrowLeftShort } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import useRandomJoke from '../hooks/useRandomJoke';
import { fetchCategories } from '../api/joke-third-party-API';

function JokeGenerator() {
	const { data: categories } = useQuery<string[]>('jokeCategories', fetchCategories);

  const [category, setCategory] = useState<string>('dev');

	const joke = useRandomJoke({ category });

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.target.value);
  }

  return (
		<div className="flex flex-col gap-6 items-center">
			<h1 className="text-4xl">The Joke Generator</h1>
			<div className="flex flex-col items-center gap-5 shadow-inner text-base min-w-[40vw] bg-gray-200 text-gray-600 rounded-[5px] p-5">
				<div className="flex w-full justify-center gap-3">
					<label><strong>Category:</strong></label>
					<select className="text-slate-700 bg-slate-200 rounded-md p-1 text-sm outline" value={category} onChange={onCategoryChange}>
						{categories && categories.map((category) => ( 
						<option key={category} value={category}>{category}</option>
						))}
					</select>
				</div>
				<div>{joke}</div>
			</div>
			<NavLink to="/" className="inline-flex items-center text-sm bg-blue-600 text-white p-2 rounded-[5px] font-bold transition-colors">
        <BsArrowLeftShort size={20} /> Home &nbsp;
      </NavLink>
		</div>
  );
}

export default JokeGenerator;
