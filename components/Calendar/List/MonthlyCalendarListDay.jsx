import React from 'react';
import { useEffect } from 'react';

export default function MonthlyCalendarListDay({
	day,
	currentDate,
	previousMonth,
	color,
	textColor,
	previousMonthsDays,
}) {
	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const today = new Date();
	const isToday =
		day === today.getDate() &&
		currentDate.getMonth() === today.getMonth() &&
		currentDate.getFullYear() === today.getFullYear() &&
		!previousMonth;

	let altBkg = false;
	if (day % 2 == 0) {
		altBkg = true;
	}
	return (
		<div
			id={isToday ? 'todayElement' : ''}
			className={`${altBkg ? 'bg-zinc-200' : color} ${
				isToday ? 'border-2 border-zinc-900' : ''
			} relative flex flex-col min-h-[200px] h-fit lg:h-[240px] p-2 header rounded-sm ${textColor} text-xs md:text-sm`}>
			<div
				className={`flex w-full justify-between ${
					isToday ? 'border-zinc-800' : altBkg ? 'border-white' : 'border-zinc-300'
				}`}>
				<div className={`flex space-x-1 w-fit`}>
					<span className='header text-[16px]'>
						{daysOfWeek[(previousMonthsDays.length - 1 + day) % 7].toUpperCase()}
					</span>
					<span className='header text-[16px]'>{day}</span>
				</div>
				{isToday && <span className='header text-[15px] subtext'>TODAY</span>}
			</div>

			<div>empty</div>
		</div>
	);
}
