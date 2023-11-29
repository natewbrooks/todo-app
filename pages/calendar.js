import { React, useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import Calendar from '../components/Calendar/Calendar';

export default function Schedule() {
	const [schedules] = useState(['Personal', 'Academic', 'Work']);
	const [currentSchedule, setCurrentSchedule] = useState(schedules[0]);
	const [dropdownActive, setDropdownActive] = useState(false);

	const handleScheduleClick = (schedule) => {
		setCurrentSchedule(schedule);
		setDropdownActive(false);
	};

	return (
		<section className='relative flex flex-col w-full h-full items-center'>
			<div className='flex justify-center w-full bg-zinc-900 lg:bg-zinc-800 h-fit'>
				<div className='group -space-y-2 flex flex-col items-center w-fit hover:cursor-pointer'>
					<div className='relative flex flex-col items-center justify-center py-2 bg-zinc-8'>
						<h2 className='hidden lg:block text-[8px] subtext'>CALENDAR</h2>
						<div
							onClick={() => setDropdownActive(!dropdownActive)}
							className='flex items-center'>
							<h2 className='px-2 text-[18px] lg:text-[20px] header'>{currentSchedule}</h2>
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
			</div>

			<div className='w-full h-full flex items-center justify-center lg:px-10'>
				<Calendar />
			</div>
		</section>
	);
}
