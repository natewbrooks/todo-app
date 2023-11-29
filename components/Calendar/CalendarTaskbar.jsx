import React from 'react';
import { FaPlus } from 'react-icons/fa';
import CalendarTaskbarItem from './CalendarTaskbarItem';

export default function CalendarTaskbar({ isSelectModalActive, selectAction }) {
	const tasks = [
		['Discussion Post', 'dsasdad'],
		['Exam', 'yellow'],
		['Quiz', 'teal'],
		['Assignment', 'purple'],
		['Essay', 'blue'],
		['Essay', 'red'],
		['Essay', 'violet'],
		['Essay', 'lime'],
		['Essay', 'emerald'],
		['Essay', 'cyan'],
		['Essay', 'sky'],
		['Essay', 'indigo'],
		['Essay', 'rose'],
		['Essay', 'fuchsia'],
		['Essay', 'blue'],
	];

	return (
		<div className='w-full flex flex-col items-center'>
			{/* <div className='subtext text-[9px] w-[50%] text-end text-zinc-600 border-white'>
				Blueprints
			</div> */}
			<div className='max-w-[50%] w-fit flex flex-row space-x-1 items-center px-2 rounded-full'>
				<div
					className={`bg-zinc-800 bottom-10 right-10 drop-shadow-lg p-[0.35rem] rounded-full hover:cursor-pointer hover:scale-105 transition-all duration-300 active:scale-90 active:duration-100`}
					onClick={() => selectAction(!isSelectModalActive)}>
					<FaPlus
						className={`text-zinc-200`}
						size={9}
					/>
				</div>

				<div className='flex space-x-3 w-fit overflow-x-auto overflow-y-hidden p-2 rounded-r-full whitespace-nowrap'>
					{tasks.map((e, index) => (
						<CalendarTaskbarItem
							key={index}
							color={e[1]}
							itemName={e[0]}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
