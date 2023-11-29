import React from 'react';
import { useState, useEffect } from 'react';
import MonthlyCalendarListDay from '../List/MonthlyCalendarListDay';
import CalendarOptions from '../CalendarOptions';
import SelectActionModal from '@/components/SelectActionModal';

export default function MonthlyCalendarList({
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
	const [showSearch, setSearchActive] = useState(false);
	const [showSearchError, setSearchError] = useState([
		false,
		'Please use numeric values for searches',
	]);

	const changeMonthToCurrent = () => {
		setCurrentDate(new Date());
	};

	const handleSearch = () => {
		if (showSearch === false) {
			setSearchActive(true);
			setMonthYearValues([null, null]); // Reset values
			setSearchError([false, showSearchError[1]]);
			return;
		}

		let month = parseInt(monthYearValues[0]);
		let year = parseInt(monthYearValues[1]);

		// Check if both month and year are default values or empty
		if (
			(isNaN(month) || month === null || month === '') &&
			(isNaN(year) || year === null || year === '')
		) {
			setSearchActive(false);
			setMonthYearValues([null, null]); // Reset values
			setSearchError([false, showSearchError[1]]);
			return;
		}

		// Clamp the year between 0 and 5000
		year = Math.max(0, Math.min(year, 5000));

		// if a number and is between 1 and 12
		if (!isNaN(month) && month >= 1 && month <= 12) {
			setCurrentDate(new Date(year || currentDate.getFullYear(), month, 1)); // Months are zero-based
			setSearchActive(false);
			setMonthYearValues([null, null]);
			setSearchError([false, showSearchError[1]]);
			return;
		} else if (!isNaN(year)) {
			// If only year is provided, assume January for the search
			setCurrentDate(new Date(year, 0, 1));
			setSearchActive(false);
			setMonthYearValues([null, null]);
			setSearchError([false, showSearchError[1]]);
			return;
		} else {
			setSearchError([true, 'Please use numbers 1-12 for searching the month.']);
			return;
		}
	};

	useEffect(() => {
		// Assuming you want to scroll when the component mounts/updates
		if (onReadyToScroll) {
			onReadyToScroll();
		}
	}, [onReadyToScroll]);

	return (
		<div
			id={'layoutContainer'}
			className='flex flex-col lg:h-full items-center justify-center border-y-2 border-l-2 border-zinc-200 w-full h-full overflow-y-auto'>
			<div
				className={`grid grid-cols-1 gap-[0.15rem] ${bgColor} w-full h-full pb-[0.15rem]'
					} items-center justify-center`}>
				{daysArray.map((day, index) => (
					<MonthlyCalendarListDay
						key={index}
						day={day}
						previousMonth={false}
						currentDate={currentDate}
						color={itemColor}
						textColor={textColor}
						previousMonthsDays={previousMonthsDays}
					/>
				))}
			</div>
		</div>
	);
}
