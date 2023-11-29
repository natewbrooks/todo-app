import React from 'react';
import { useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import TodoTask from '@/components/Todo/TodoTask';

export default function TodoWeeklyCategory({ index, name, assignDate, dueDate, completedDate }) {
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
				className={`flex flex-col ${
					isCategoryCollapsed ? 'h-0' : 'h-full'
				} transition-all duration-300 overflow-hidden `}>
				<TodoTask
					index={1}
					name='Computer Science Assignment'
					assignDate={'Sept. 27'}
					dueDate={'Oct. 7'}
					completedDate={null}
					weekly={true}
				/>
				<TodoTask
					index={2}
					name='Computer Science Assignment'
					assignDate={'Sept. 27'}
					dueDate={'Nov. 9'}
					completedDate={null}
					weekly={true}
				/>
				<TodoTask
					index={3}
					name='Computer Science Assignment'
					assignDate={'Sept. 27'}
					dueDate={'Nov. 15'}
					completedDate={null}
					weekly={true}
					category={'COSC 336'}
				/>
			</div>
		</div>
	);
}
