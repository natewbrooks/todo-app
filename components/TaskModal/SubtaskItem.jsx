import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function SubtaskItem({ label, index, onDelete, isFocused, setActiveSubtaskIndex }) {
	const itemExitVariant = {
		initial: {
			opacity: 0,
			height: 0,
			transition: {
				duration: 0.3,
			},
		},
		animate: {
			opacity: 1,
			height: 'auto',
			transition: {
				duration: 0.3,
			},
		},
		exit: {
			opacity: 0,
			height: 0,
			transition: {
				duration: 0.3,
			},
		},
	};

	const inputVariants = {
		focused: {
			height: 'auto',
			overflow: 'visible',
			whiteSpace: 'normal',
		},
		notFocused: {
			height: '13px',
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
		},
	};

	const maxLength = 115;

	return (
		<AnimatePresence>
			<motion.div
				onClick={() => setActiveSubtaskIndex(index)}
				initial='enter'
				animate='visible'
				exit='exit'
				variants={itemExitVariant}
				className={`relative bg-zinc-300 ${
					index == 0 ? `mb-1 ${isFocused ? 'mt-3' : 'mt-1'} mx-1` : 'mb-1 mx-1'
				}  border border-white rounded-md px-2 py-[0.15rem] h-fit flex space-x-2 items-center transition-all duration-150 ease-in-out`}>
				<motion.textarea
					rows='3'
					placeholder={label}
					maxLength={maxLength}
					initial='notFocused'
					animate={isFocused ? 'focused' : 'notFocused'}
					variants={inputVariants}
					className='w-full h-fit bg-zinc-300 text-zinc-800 placeholder:text-zinc-800 focus:outline-none header text-[10px] max-h-16 min-h-[13px] resize-none'
				/>
				<div
					className={`${
						isFocused ? 'visible' : 'invisible'
					} group absolute -top-2 -right-1 p-[0.1rem] rounded-full text-zinc-800 bg-zinc-300 hover:scale-110 hover:cursor-pointer`}
					onClick={() => onDelete(index)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='5'
						stroke='black'
						className='w-[0.65rem] h-[0.65rem]'
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						exit={{ pathLength: 0 }}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
