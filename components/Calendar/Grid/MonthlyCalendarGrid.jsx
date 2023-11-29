import React from 'react';
import { useState, useEffect } from 'react';
import MonthlyCalendarDay from './MonthlyCalendarGridDay';
import CalendarOptions from '../CalendarOptions';
import CalendarTaskbar from '../CalendarTaskbar';

export default function MonthlyCalendarGrid({
	previousMonthsDays,
	daysArray,
	currentDate,
	interactable,
	bgColor,
	itemColor,
	textColor,
	setDay,
	selectedDay,
	month,
	monthYearValues,
	setMonthYearValues,
	newTaskModalActive,
	setTaskModalActive,
	setCurrentDate,
	onReadyToScroll,
}) {
	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	useEffect(() => {
		// Assuming you want to scroll when the component mounts/updates
		if (onReadyToScroll) {
			onReadyToScroll();
		}
	}, [onReadyToScroll]);

	return (
		<div className={`flex flex-col w-full h-full items-center justify-center overflow-hidden`}>
			{/* Header */}

			{!interactable && (
				<div className='mt-4 grid grid-cols-7 w-full h-fit text-center rounded-md border-b-2 border-zinc-200'>
					{/* Day Labels */}
					{daysOfWeek.map((day, index) => (
						<span
							className='text-zinc-800 opacity-100 text-xs header'
							key={index}>
							{day}
						</span>
					))}
				</div>
			)}
			<div
				id={'layoutContainer'}
				className='w-full h-fit overflow-y-auto border-zinc-300 justify-center flex'>
				<div
					className={`grid grid-cols-7 gap-[0.15rem] ${bgColor}  h-fit px-[0.15rem] ${
						interactable ? 'py-[0.15rem] w-fit' : 'w-full'
					} items-center justify-center ${interactable ? 'rounded-md' : ''}`}>
					{/* Render the grid of days from the previous month */}
					{previousMonthsDays.map((day, index) => (
						<MonthlyCalendarDay
							key={index * 2000}
							day={day}
							previousMonth={true}
							currentDate={currentDate}
							color={itemColor}
							textColor={textColor}
							interactable={interactable}
							setDay={setDay}
							selectedDay={selectedDay}
						/>
					))}
					{daysArray.map((day, index) => (
						<MonthlyCalendarDay
							key={index}
							day={day}
							previousMonth={false}
							currentDate={currentDate}
							color={itemColor}
							textColor={textColor}
							interactable={interactable}
							setDay={setDay}
							selectedDay={selectedDay}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
