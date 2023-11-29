import React from 'react';
import { useEffect } from 'react';
import COLORS from '../../../constants/colors';
import MonthlyCalendarGridCategory from './MonthlyCalendarGridCategory';

export default function MonthlyCalendarDay({
	day,
	currentDate,
	previousMonth,
	interactable,
	color,
	textColor,
	setDay,
	selectedDay,
}) {
	const today = new Date();
	const isToday =
		day === today.getDate() &&
		currentDate.getMonth() === today.getMonth() &&
		currentDate.getFullYear() === today.getFullYear() &&
		!previousMonth;

	const handleClick = () => {
		// Only set the day if it's not from the previous month and greater than or equal to the current date
		if (
			!previousMonth &&
			!(day < new Date().getDate() && currentDate.getMonth() <= new Date().getMonth())
		) {
			setDay(day);
		}
	};

	useEffect(() => {
		if (selectedDay < today.getDate() && currentDate.getMonth() <= today.getMonth()) {
			setDay(today.getDate() + 1);
		}
	}, [selectedDay]);

	return (
		<>
			{/* FOR THE SCHEDULE PAGE */}
			{!interactable && (
				<div
					id={isToday ? 'todayElement' : ''}
					className={`${previousMonth ? 'bg-zinc-300' : color} ${
						isToday ? 'border-2 border-zinc-900 bg-teal-100' : ''
					} aspect-square p-2 header rounded-sm flex flex-col ${textColor} text-xs md:text-sm overflow-y-auto`}>
					<div className='flex flex-row justify-between items-center pb-2'>
						<span className='pb-2'>{day}</span>
						{isToday && (
							<span className='text-[10px] px-2 bg-zinc-800 text-white rounded-full subtext'>
								TODAY
							</span>
						)}
					</div>
					{day === 12 && (
						<div className='flex flex-col space-y-5'>
							<MonthlyCalendarGridCategory
								isGray={previousMonth}
								name={'COSC 336'}
								color={'red'}
							/>
							<MonthlyCalendarGridCategory
								isGray={previousMonth}
								name={'HLTH 220'}
								color={'blue'}
							/>
							<MonthlyCalendarGridCategory
								isGray={previousMonth}
								name={'HIST 120'}
								color={'purple'}
							/>
							<MonthlyCalendarGridCategory
								isGray={previousMonth}
								name={'MATH 412'}
								color={'green'}
							/>
						</div>
					)}
				</div>
			)}
			{/* FOR THE MINICALENDAR COMPONENT */}
			{interactable && (
				<div
					onClick={handleClick}
					style={{
						background: isToday
							? selectedDay === day
								? 'linear-gradient(to bottom, ' +
								  COLORS.yellow[400] +
								  ' 50%, ' +
								  COLORS.blue[400] +
								  ' 50%)'
								: COLORS.yellow[400]
							: selectedDay === day && !previousMonth
							? COLORS.blue[400]
							: '',
					}}
					className={`p-[0.35rem] select-none transition-all duration-300 ${
						previousMonth ? 'bg-zinc-500 text-zinc-700 hover:cursor-not-allowed' : 'bg-white'
					} ${
						day < new Date().getDate() &&
						currentDate.getMonth() == new Date().getMonth() &&
						currentDate.getFullYear() == new Date().getFullYear()
							? 'bg-zinc-400 text-zinc-600 hover:cursor-not-allowed'
							: !previousMonth
							? 'hover:bg-zinc-300 hover:scale-105 text-zinc-900 hover:cursor-pointer'
							: ''
					} ${
						selectedDay === day && !previousMonth ? 'scale-105' : ''
					} aspect-square items-center flex justify-center p-1 header rounded-sm ${textColor} text-sm`}>
					{day}
				</div>
			)}
		</>
	);
}
