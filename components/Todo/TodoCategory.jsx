import React, { useState, useEffect } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import TodoTask from '@/components/Todo/TodoTask';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
	open: { height: 'auto' },
	collapsed: { height: 0 },
};

export default function TodoCategory({
	index,
	name,
	tasks = [],
	bgColor = 'bg-red-300',
	outlineColor = 'border-red-300',
	taskSort,
}) {
	const [isCompleteShown, setComplete] = useState(false);
	const [sortedTasks, setSortedTasks] = useState([]);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		sortTasks();
	}, [taskSort, tasks]);

	const sortTasks = () => {
		const sorted = [...tasks].sort((a, b) => {
			if (a.completedDate && !b.completedDate) return 1;
			if (!a.completedDate && b.completedDate) return -1;

			switch (taskSort) {
				case 'alphabetical':
					return a.name.localeCompare(b.name);
				case 'priority':
					return b.priority - a.priority;
				case 'dueDate':
					return new Date(a.dueDate) - new Date(b.dueDate);
				case 'priorityAlphabetical':
					if (a.priority === b.priority) {
						return a.name.localeCompare(b.name);
					}
					return b.priority - a.priority;
				case 'priorityDate':
					if (a.priority === b.priority) {
						return new Date(a.dueDate) - new Date(b.dueDate);
					}
					return b.priority - a.priority;
				default:
					return 0;
			}
		});
		setSortedTasks(sorted);
	};

	const countCompletedTasks = () => {
		return tasks.filter((task) => task.completedDate).length;
	};

	return (
		<motion.div className='w-full flex items-center flex-col px-2'>
			<div
				className={`transition-all duration-300 overflow-hidden flex w-full p-1 flex-col rounded-md`}>
				<motion.div
					className={`relative flex flex-col mb-4 text-zinc-800 w-full border-2 rounded-md overflow-hidden ${outlineColor} ${bgColor}`}>
					<div
						onClick={() => setVisible(!visible)}
						className={`flex flex-col w-full px-4 py-1 hover:cursor-pointer ${bgColor}`}>
						<div className={`flex w-full items-center justify-between`}>
							<div className={`flex flex-col -space-y-1 translate-y-[0.15rem]`}>
								<div className='header-bold text-[18px] w-fit whitespace-nowrap text-black'>
									{name}
								</div>
								<div className={`flex space-x-1 h-fit`}>
									<div className='subtext text-[12px] w-fit whitespace-nowrap text-black'>
										{tasks.length} tasks due
									</div>
									<span className={`-translate-y-[0.2rem] scale-[80%] text-zinc-800`}>•</span>
									<div className='subtext text-[12px] w-fit whitespace-nowrap text-black'>
										{countCompletedTasks()} tasks completed
									</div>
								</div>
							</div>
							<BiSolidDownArrow
								fill='black'
								size={10}
								className={`relative ${
									visible ? 'rotate-0' : 'rotate-180'
								} transition-all duration-300`}
							/>
						</div>
					</div>
					<AnimatePresence initial={false}>
						{visible && (
							<motion.div
								initial='collapsed'
								animate='open'
								exit='collapsed'
								variants={variants}
								transition={{ duration: 0.5 }}
								style={{ position: 'relative', zIndex: 1 }}
								className={`flex flex-col overflow-hidden`}>
								{sortedTasks.map((task, idx) => (
									<TodoTask
										key={idx}
										index={idx + 1}
										bgColor={bgColor}
										name={task.name}
										description={task.description}
										priority={task.priority}
										assignDate={task.assignDate}
										dueDate={task.dueDate}
										dueTime={task.dueTime}
										completedDate={task.completedDate}
										weekly={task.weekly}
										category={task.category}
										subtasks={task.subtasks}
										onTaskCompletion={() => sortTasks()} // Update the tasks list when a task is completed
									/>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>
		</motion.div>
	);
}
