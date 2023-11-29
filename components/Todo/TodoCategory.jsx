import React from 'react';
import { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import TodoTask from '@/components/Todo/TodoTask';

export default function TodoCategory({ index, name, assignDate, dueDate, completedDate }) {
	const [isCompleteShown, setComplete] = useState(completedDate != null);
	const [isIncompleteShown, setIncomplete] = useState(true);
	const [isCategoryCollapsed, setCategoryCollapsed] = useState(false);

	return (
		<div className='flex flex-col px-5 pt-5'>
			<div
				onClick={() => setCategoryCollapsed(!isCategoryCollapsed)}
				className='flex space-x-2 items-center hover:cursor-pointer'>
				<div className='flex space-x-1 items-center w-full'>
					<h2 className='text-zinc-800 header text-[20px] whitespace-nowrap'>{name}</h2>
					<div className='rounded-sm bg-zinc-700 h-[1px] w-[100%]'></div>

					<BiSolidDownArrow
						fill='black'
						size={8}
						className={`${
							isCategoryCollapsed ? 'rotate-180' : 'rotate-0'
						} transition-all duration-300`}
					/>
				</div>
			</div>
			<div
				className={`${
					isCategoryCollapsed ? 'max-h-0' : 'max-h-[100%]'
				} transition-all duration-300 overflow-hidden flex flex-col`}>
				<div className={`flex flex-col text-zinc-800 lg:px-4 py-1 space-y-2`}>
					<div
						onClick={() => setIncomplete(!isIncompleteShown)}
						className='flex space-x-1 items-center hover:cursor-pointer'>
						<span className='subtext text-[8px]'>INCOMPLETE</span>
						<div className='rounded-sm bg-zinc-700/30 h-[1px] w-[100%]'></div>
						<BiSolidDownArrow
							fill='black'
							size={6}
							className={`relative ${
								isIncompleteShown ? 'rotate-0' : 'rotate-180'
							} transition-all duration-300`}
						/>
					</div>
					<div
						className={`flex flex-col ${
							isIncompleteShown ? 'h-full' : 'h-0'
						} transition-all duration-300 overflow-hidden `}>
						<TodoTask
							index={1}
							name='Computer Science Assignment'
							assignDate={'Sept. 27'}
							dueDate={'Nov. 5'}
							completedDate={null}
						/>
						<TodoTask
							index={2}
							name='Computer Science Assignment'
							assignDate={'Sept. 27'}
							dueDate={'Nov. 9'}
							completedDate={null}
						/>
						<TodoTask
							index={3}
							name='Computer Science Assignment'
							assignDate={'Sept. 27'}
							dueDate={'Nov. 15'}
							completedDate={null}
						/>
					</div>
				</div>
				{/* COLLAPSED BY DEFAULT ALWAYS */}
				<div className='flex flex-col text-zinc-800 lg:px-4 py-1 space-y-2'>
					<div
						onClick={() => setComplete(!isCompleteShown)}
						className='flex space-x-1 items-center hover:cursor-pointer'>
						<span className='subtext text-[8px]'>COMPLETED</span>
						<div className='rounded-sm bg-zinc-700/30 h-[1px] w-[100%]'></div>
						<BiSolidDownArrow
							fill='black'
							size={6}
							className={`relative ${
								isCompleteShown ? 'rotate-0' : 'rotate-180'
							} transition-all duration-300`}
						/>
					</div>
					<div
						className={`flex flex-col ${
							isCompleteShown ? 'h-full' : 'h-0'
						} transition-all duration-300 overflow-hidden `}>
						<TodoTask
							index={1}
							name='Computer Science Assignment'
							assignDate={'Sept. 27'}
							dueDate={'Nov. 15'}
							completedDate={'Nov. 3'}
						/>
						<TodoTask
							index={2}
							name='Computer Science Exam'
							assignDate={'Sept. 27'}
							dueDate={'Nov. 15'}
							completedDate={'Nov. 3'}
						/>
						<TodoTask
							index={3}
							name='Computer Science Quiz'
							assignDate={'Sept. 27'}
							dueDate={'Nov. 3'}
							completedDate={'Nov. 4'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
