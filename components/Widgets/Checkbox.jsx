import React from 'react';
import { FaC, FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import COLORS from '@/constants/colors';

export default function Checkbox({ size, color, checked, clickHandler }) {
	const [isChecked, setIsChecked] = useState(checked);

	return (
		<AnimatePresence>
			<div
				onClick={() => {
					setIsChecked(!isChecked);
					if (clickHandler) {
						clickHandler();
					}
				}}
				style={{ borderColor: 'border-' + color }}
				className={`group aspect-square p-[0.15rem] h-fit w-fit flex items-center justify-center border-[2.5px] border-zinc-800/20 bg-transparent rounded-md hover:cursor-pointer`}>
				<motion.svg
					xmlns='http://www.w3.org/2000/svg'
					width={size}
					height={size}
					viewBox='0 0 24 24'>
					<motion.path
						className={`${isChecked ? 'block' : 'hidden'}`}
						d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z'
					/>
				</motion.svg>
			</div>
		</AnimatePresence>
	);
}
