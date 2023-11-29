import React from 'react';
import { useState } from 'react';
import { BiSolidDownArrow, BiSolidStar } from 'react-icons/bi';
import TodoCategory from '../components/Todo/TodoCategory';
import SelectActionModal from '../components/SelectActionModal';
import TodoWeeklyCategory from '../components/Todo/TodoWeeklyCategory copy';

export default function Todo() {
	const [completeShown, setComplete] = useState(false);
	const [taskModalActive, setTaskModalActive] = useState(false);
	const [schedules] = useState(['Personal', 'Academic', 'Work']);
	const [currentSchedule, setCurrentSchedule] = useState(schedules[0]);
	const [dropdownActive, setDropdownActive] = useState(false);

	const handleScheduleClick = (schedule) => {
		setCurrentSchedule(schedule);
		setDropdownActive(false);
	};

	return (
		<section className='relative w-full h-full flex flex-col'>
			<div
				onClick={() => setTaskModalActive(true)}
				className='z-40 drop-shadow-md hover:cursor-pointer hover:scale-110 active:scale-90 absolute right-4 bottom-4 rounded-full p-5 bg-zinc-800 transition-all duration-300'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='14'
					height='14'
					fill='white'
					viewBox='0 0 24 24'>
					<path d='M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z' />
				</svg>
			</div>
			<div className='group -space-y-2 flex flex-col items-center hover:cursor-pointer bg-zinc-900 lg:bg-zinc-800 w-full'>
				<div className='relative flex flex-col items-center justify-center py-2 lg:-space-y-1'>
					<h2 className='hidden lg:block text-[8px] subtext'>TODO</h2>
					<div
						onClick={() => setDropdownActive(!dropdownActive)}
						className='flex items-center'>
						<h2 className='px-2 text-[20px] header'>{currentSchedule}</h2>
						<BiSolidDownArrow
							fill='white'
							size={8}
							className={`relative  ${
								dropdownActive ? 'rotate-0' : 'rotate-180'
							} transition-all duration-300`}
						/>
					</div>
					{/* Dropdown */}
					{dropdownActive && (
						<div className='flex flex-col absolute -bottom-[72px] bg-zinc-300 z-10 rounded-md outline outline-zinc-800'>
							{schedules.map((schedule, i) => (
								<span
									key={i}
									className={`${
										currentSchedule == schedule
											? 'bg-zinc-200 text-zinc-800 outline rounded-sm hover:cursor-default'
											: 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-200 hover:cursor-pointer'
									} text-[16px] header w-full text-center px-2 select-none`}
									onClick={() => {
										if (schedule != currentSchedule) {
											handleScheduleClick(schedule);
										}
									}}>
									{schedule}
								</span>
							))}
						</div>
					)}
				</div>
			</div>

			<div
				className={`${
					taskModalActive ? 'blur' : 'blur-none'
				} w-full h-full flex flex-col overflow-auto px-0 lg:px-20 pb-4 transition-all duration-300`}>
				<TodoCategory name='COSC 336' />
				<TodoWeeklyCategory name='This Week' />
			</div>
			{taskModalActive && <SelectActionModal selectModalActive={setTaskModalActive} />}
		</section>
	);
}
