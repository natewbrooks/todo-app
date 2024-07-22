import React from 'react';
import { delay, motion } from 'framer-motion';
import { FaC, FaCheck } from 'react-icons/fa';
import { useState } from 'react';

export default function Toggle({ defaultValue, width, height }) {
	const [isToggled, setToggle] = useState(defaultValue);

	const jiggleTransition = {
		x: {
			type: 'spring',
			stiffness: 400,
			damping: 18,
			duration: 0.4,
			bounce: 0.2,
			// delay: 0.5,
		},
		backgroundColor: {
			// delay: 0.1,
		},
	};

	return (
		<div
			onClick={() => setToggle(!isToggled)}
			className={`w-[2rem] ${
				isToggled ? 'bg-green-400' : 'bg-zinc-700'
			} w-9 h-5 items-center rounded-full flex p-[0.2rem] transition-colors duration-300 ease-in-out hover:cursor-pointer`}>
			<motion.div
				initial={false}
				animate={{
					x: isToggled ? '100%' : '0%',
					backgroundColor: isToggled ? '#3F3F3F' : '#D1D1D1',
				}}
				transition={jiggleTransition}
				className={`w-[50%] h-[85%] rounded-full`}></motion.div>
		</div>
	);
}
