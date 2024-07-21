import React, { useState, useEffect } from 'react';
import { BiSolidStar, BiSolidDownArrow } from 'react-icons/bi';
import { FaEdit, FaPlus } from 'react-icons/fa';
import Checkbox from '../Widgets/Checkbox';
import TodoSubtask from './TodoSubtask';
import { motion } from 'framer-motion';

const variants = {
	open: { opacity: 1, height: 'auto' },
	collapsed: { opacity: 1, height: 0 },
};

const getDayOfWeek = (dateStr) => {
	const [year, month, day] = dateStr.split('/').map((num) => parseInt(num, 10));
	const date = new Date(year, month - 1, day); // Adjust for zero-based month index
	return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export default function TodoTask({
	index,
	name,
	bgColor,
	description,
	assignDate,
	dueDate,
	dueTime,
	completedDate,
	priority,
	subtasks,
	onTaskCompletion,
}) {
	const [isComplete, setComplete] = useState(false);
	const [completeDate, setCompleteDate] = useState();
	const [subtasksVisible, setSubtasksVisible] = useState(subtasks.length > 1);
	const [subtaskStates, setSubtaskStates] = useState(subtasks);

	useEffect(() => {
		setSubtaskStates(subtasks);
	}, [subtasks]);

	const backgroundColor = getBackgroundColor(index, isComplete);

	const setCompleted = () => {
		setComplete(!isComplete);
		if (!isComplete) {
			const currentDate = new Date();
			setCompleteDate(
				`${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
			);
			setSubtasksVisible(false);
		} else {
			setSubtasksVisible(true);
			setCompleteDate(null);
		}
		onTaskCompletion(); // Notify parent component of task completion
	};

	const toggleSubtask = (index) => {
		const updatedSubtasks = subtaskStates.map((subtask, idx) => {
			if (idx === index) {
				return { ...subtask, completed: !subtask.completed };
			}
			return subtask;
		});
		setSubtaskStates(updatedSubtasks);
	};

	const dayDue = getDayOfWeek(dueDate);
	const dayAssigned = getDayOfWeek(assignDate);
	const formattedDueDate = dueDate.slice(0, 5); // Removes the year part
	const formattedAssignDate = assignDate.slice(0, 5);

	return (
		<div
			className={`relative w-full space-y-2 flex flex-col justify-between px-2 lg:px-5 py-3 items-center transition-all duration-300 ${
				isComplete
					? index % 2 == 0
						? 'bg-opacity-90 bg-green-300'
						: 'bg-opacity-90 bg-green-200'
					: index % 2 === 0
					? 'bg-opacity-30 bg-zinc-200'
					: 'bg-opacity-60 bg-zinc-200'
			}`}>
			<div className={`w-full relative flex space-x-4 `}>
				{priority > 0 && (
					<div className='flex flex-col items-center justify-center w-8 min-h-[50px] h-full'>
						{Array.from({ length: priority }, (_, i) => (
							<BiSolidStar
								key={i}
								size={18}
								className={`text-zinc-900 ${isComplete ? 'opacity-20' : ''}`}
							/>
						))}
					</div>
				)}
				<div className={`${isComplete ? 'opacity-50' : ''} flex w-full h-full justify-between`}>
					<div className={`flex flex-col space-y-1 w-full h-full`}>
						<div className={`w-full flex justify-between`}>
							<div className={`flex items-center w-fit whitespace-nowrap space-x-1`}>
								<span
									className={`font-bold text-zinc-800 text-[10px]`}>{`DUE ${dayDue.toUpperCase()} @ ${dueTime}`}</span>
								<span className={`-translate-y-[0.05rem] scale-[80%] text-zinc-800`}>•</span>
								<span className={`font-bold text-zinc-800 text-[10px]`}>{formattedDueDate}</span>
							</div>
							<div
								className={`hidden xs:flex items-center w-fit whitespace-nowrap space-x-1 opacity-30`}>
								<span
									className={`font-bold text-zinc-800 text-[10px]`}>{`ASSIGNED ${dayAssigned.toUpperCase()}`}</span>
								<span className={`-translate-y-[0.05rem] scale-[80%] text-zinc-800`}>•</span>
								<span className={`font-bold text-zinc-800 text-[10px]`}>{formattedAssignDate}</span>
								<span className={`-translate-y-[0.05rem] scale-[80%] text-zinc-800`}>•</span>
								<div
									className={`w-fit items-center h-full space-x-[0.15rem] flex active:scale-90 cursor-pointer`}>
									<FaEdit
										size={10}
										className={`text-zinc-800`}
									/>
									<span className={`font-bold text-zinc-800 text-[10px]`}>EDIT</span>
								</div>
							</div>
							<div
								className={`xs:hidden opacity-30 w-fit items-center h-full space-x-[0.15rem] flex active:scale-90 cursor-pointer`}>
								<FaEdit
									size={10}
									className={`text-zinc-800`}
								/>
								<span className={`font-bold text-zinc-800 text-[10px]`}>EDIT</span>
							</div>
						</div>
						<div className={`w-full flex justify-between items-center space-x-4`}>
							<div className={`flex flex-col h-fit w-full`}>
								<div className={`flex flex-col w-full space-y-2`}>
									<div className={`flex flex-col space-y-1 w-full`}>
										<h2 className='text-zinc-800 text-[16px] w-full leading-none'>{name}</h2>
										<div className='subtext italic text-zinc-800 text-[10px] w-full'>
											{description}
										</div>
									</div>
								</div>
							</div>
							<div
								onClick={() => setCompleted()}
								className={`block ${isComplete ? 'opacity-50' : 'opacity-100'}`}>
								<Checkbox
									size={18}
									checked={isComplete}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Subtasks Toggle and List */}
			{subtasks.length > 0 && (
				<div
					className={`${
						isComplete ? 'opacity-50' : ''
					}  w-full text-zinc-800 text-[10px] bg-opacity-[5%]  rounded-md bg-black px-2 py-1`}>
					<div
						className={`flex justify-between items-center text-zinc-800 text-[10px] opacity-60 bg-opacity-[5%] cursor-pointer`}
						onClick={() => setSubtasksVisible(!subtasksVisible)}>
						<span className='font-bold'>SUBTASKS</span>
						<BiSolidDownArrow
							fill='black'
							size={8}
							className={`transition-all duration-300 ${
								!subtasksVisible ? 'rotate-180' : 'rotate-0'
							}`}
						/>
					</div>
					<motion.div
						className={`overflow-hidden `}
						initial={false}
						animate={subtasksVisible ? 'open' : 'collapsed'}
						variants={variants}>
						{subtaskStates.map((subtask, idx) => (
							<TodoSubtask
								key={idx}
								name={subtask.name}
								completed={subtask.completed}
								onToggle={() => toggleSubtask(idx)}
							/>
						))}
					</motion.div>
				</div>
			)}
		</div>
	);
}

function getBackgroundColor(index, isComplete) {
	if (isComplete) {
		return index % 2 === 0 ? 'rgba(134, 239, 172, 0.6)' : 'rgba(134, 239, 172, 0.4)';
	}
	return index % 2 === 0 ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.4)';
}
