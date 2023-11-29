import React from 'react';
import { FaC, FaCheck } from 'react-icons/fa';
import { useState } from 'react';

export default function Toggle({ defaultValue }) {
	const [isToggled, setToggle] = useState(defaultValue);

	return (
		<div
			onClick={() => setToggle(!isToggled)}
			className={`w-[2rem] ${
				isToggled ? 'bg-green-400' : 'bg-zinc-700'
			} w-9 h-5 items-center rounded-full flex p-[0.2rem] transition-all duration-300 ease-in-out hover:cursor-pointer`}>
			<div
				className={`w-[50%] h-[85%] rounded-full transition-all delay-100 duration-300 ease-in-out ${
					isToggled ? 'translate-x-[100%] bg-zinc-800' : 'translate-x-0 bg-zinc-300'
				}`}></div>
		</div>
	);
}
