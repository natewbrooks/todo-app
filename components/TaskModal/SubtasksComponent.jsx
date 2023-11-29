import React from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import SubtaskItem from './SubtaskItem';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubtasksComponent({}) {
	const [subtasks, setSubTasks] = useState(['Grape a spinach', 'Lemon a bean']); // This is just sample data, you might want to pass this as props if it's dynamic
	const [subtasksVisible, setSubtasksVisible] = useState(false);
	const [activeSubtaskIndex, setActiveSubtaskIndex] = useState(null);
	const [toBeDeleted, setToBeDeleted] = useState([]);

	const handleDelete = (indexToDelete) => {
		setToBeDeleted((prev) => [...prev, indexToDelete]);
	};

	const handleAdd = () => {
		setSubTasks(() => {
			const updatedTasks = [...subtasks, 'New subtask...'];
			return updatedTasks;
		});
	};

	const subtasksVariant = {
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

	return (
		<div className='flex flex-col space-y-1 w-full h-fit items-start text-zinc-800 overflow-x-hidden bg-white py-[0.15rem]'>
			<div className='group w-full flex items-center justify-between hover:cursor-pointer'>
				<div
					className='flex flex-row w-full space-x-1 items-center'
					onClick={() => setSubtasksVisible(!subtasksVisible)}>
					<h3 className='opacity-100 text-[10px] header'>Subtasks</h3>
					<div className='rounded-sm bg-zinc-300 h-[1px] w-[100%]'></div>
					<BiSolidDownArrow
						fill='black'
						size={7}
						className={`relative ${
							subtasksVisible ? 'rotate-0' : 'rotate-180'
						} transition-all duration-300`}
					/>
				</div>
				<AnimatePresence>
					{subtasksVisible && (
						<motion.div
							initial={{ rotate: 0, opacity: 0 }}
							animate={{ rotate: 1440, opacity: 1 }}
							exit={{ rotate: 0, opacity: 0 }}
							onClick={() => handleAdd()}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-4 h-4'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 6v12m6-6H6'
								/>
							</svg>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<AnimatePresence>
				{subtasksVisible && (
					<motion.div
						initial='hidden'
						animate='visible'
						exit='hidden'
						variants={subtasksVariant}
						key={subtasks}
						onAnimationComplete={() => {
							if (toBeDeleted.length > 0) {
								setSubTasks((subtasks) =>
									subtasks.filter((_, index) => !toBeDeleted.includes(index))
								);
								setToBeDeleted([]); // Clear the toBeDeleted array after deleting
							}
						}}
						className='flex w-full h-fit max-h-[10rem] bg-zinc-300 rounded-md flex-col overflow-x-hidden'>
						{subtasks.map(
							(task, index) =>
								!toBeDeleted.includes(index) && (
									<SubtaskItem
										key={index}
										index={index}
										label={task}
										onDelete={handleDelete}
										isFocused={index === activeSubtaskIndex}
										setActiveSubtaskIndex={setActiveSubtaskIndex}
									/>
								)
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
