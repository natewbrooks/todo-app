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
				isToday ? 'border-2 border-zinc-900 bg-teal-100' : ''
			} relative flex h-[100px] lg:h-[120px] p-1 header rounded-sm ${textColor} text-xs md:text-sm`}>
			<div
				className={`flex flex-col items-center justify-center space-y-2 w-[4rem] border-r-2 ${
					isToday ? 'border-zinc-800' : altBkg ? 'border-white' : 'border-zinc-300'
				}`}>
				<span className='header text-[16px]'>
					{daysOfWeek[(previousMonthsDays.length - 1 + day) % 7]}
				</span>
				<span className='header text-[26px]'>{day}</span>
			</div>
			<div className='w-full h-full px-2'>SPACE</div>
			{isToday && (
				<div className='absolute top-1 right-1 bg-zinc-800 text-white rounded-full px-2 subtext text-[10px]'>
					TODAY
				</div>
			)}
		</div>
	);
}
