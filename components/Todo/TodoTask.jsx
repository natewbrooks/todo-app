import React, { useState, useEffect } from 'react';
import { BiSolidStar, BiSolidDownArrow } from 'react-icons/bi';
import { FaEdit, FaPlus } from 'react-icons/fa';
import Checkbox from '../Widgets/Checkbox';
import TodoSubtask from './TodoSubtask';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

const variants = {
	open: { height: 'auto' },
	collapsed: { height: 0 },
};

const getDayOfWeek = (dateStr) => {
	const [year, month, day] = dateStr.split('/').map((num) => parseInt(num, 10));
	const date = new Date(year, month - 1, day); // Adjust for zero-based month index
	return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const formatAMPM = (date) => {
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	const strTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
	return strTime;
};

const formatDate = (date) => {
	const year = date.getFullYear().toString().slice(2);
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return `${month}/${day}/${year}`;
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
	const [completeDate, setCompleteDate] = useState(null);
	const [completeTime, setCompleteTime] = useState(null);
	const [subtasksVisible, setSubtasksVisible] = useState(subtasks.length > 1);
	const [subtaskStates, setSubtaskStates] = useState(subtasks);

	useEffect(() => {
		setSubtaskStates(subtasks);
	}, [subtasks]);

	const setCompleted = () => {
		setComplete(!isComplete);
		if (!isComplete) {
			const currentDate = new Date();
			setCompleteDate(formatDate(currentDate));
			setCompleteTime(formatAMPM(currentDate));
			setSubtasksVisible(false);
		} else {
			setSubtasksVisible(true);
			setCompleteDate(null);
			setCompleteTime(null);
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
	const dayComplete = completeDate ? getDayOfWeek(completeDate) : '';

	return (
		<div
			className={`relative w-full space-y-2 flex flex-col justify-between px-2 lg:px-5 py-3 items-center transition-all duration-300 ${
				isComplete
					? index % 2 === 0
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
							<div className={`flex flex-col -space-y-2`}>
								<AnimatePresence>
									{isComplete ? (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.2 }}>
											<div className={`flex items-center w-fit whitespace-nowrap space-x-1`}>
												<span
													className={`font-bold text-zinc-800 text-[10px]`}>{`COMPLETED ${dayComplete.toUpperCase()} @ ${completeTime}`}</span>
												<span className={`-translate-y-[0.05rem] scale-[80%] text-zinc-800`}>
													•
												</span>
												<span className={`font-bold text-zinc-800 text-[10px]`}>
													{completeDate}
												</span>
											</div>
										</motion.div>
									) : (
										<div className={`flex items-center w-fit whitespace-nowrap space-x-1`}>
											<span
												className={`font-bold text-zinc-800 text-[10px]`}>{`DUE ${dayDue.toUpperCase()} @ ${dueTime}`}</span>
											<span className={`-translate-y-[0.05rem] scale-[80%] text-zinc-800`}>•</span>
											<span className={`font-bold text-zinc-800 text-[10px]`}>{dueDate}</span>
										</div>
									)}
								</AnimatePresence>
							</div>
							<div
								className={`hidden xs:flex items-center w-fit whitespace-nowrap space-x-1 opacity-30`}>
								<span
									className={`font-bold text-zinc-800 text-[10px]`}>{`ASSIGNED ${dayAssigned.toUpperCase()}`}</span>
								<span className={`-translate-y-[0.05rem] scale-[80%] text-zinc-800`}>•</span>
								<span className={`font-bold text-zinc-800 text-[10px]`}>{assignDate}</span>
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
					<AnimatePresence initial={false}>
						{subtasksVisible && (
							<motion.div
								className={`overflow-hidden `}
								initial='collapsed'
								animate='open'
								exit='collapsed'
								variants={variants}
								transition={{ duration: 0.4, ease: 'easeInOut' }}>
								<Reorder.Group
									axis='y'
									values={subtaskStates}
									onReorder={setSubtaskStates}>
									{subtaskStates.map((subtask, idx) => (
										<Reorder.Item
											key={subtask.name}
											value={subtask}>
											<TodoSubtask
												name={subtask.name}
												completed={subtask.completed}
												toggleSubtask={() => toggleSubtask(idx)}
											/>
										</Reorder.Item>
									))}
								</Reorder.Group>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			)}
		</div>
	);
}
