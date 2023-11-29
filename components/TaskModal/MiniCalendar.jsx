import React, { useEffect, useState, useRef } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import MonthlyCalendarGrid from '../Calendar/Grid/MonthlyCalendarGrid';

export default function MiniCalendar({
	setMonth,
	setDay,
	setYear,
	selectedDay,
	selectedMonth,
	selectedYear,
}) {
	const [currentDate, setCurrentDate] = useState(new Date());
	const inputElementRef = useRef(null);

	const handleMonthChange = (direction) => {
		const newDate = new Date(selectedYear, currentDate.getMonth());
		if (
			(direction === 'left' && newDate > new Date()) || // Allow going to previous month if it's the current or future month
			(direction === 'right' && newDate.getFullYear() >= new Date().getFullYear()) // Allow going to next month if it's a future year
		) {
			newDate.setMonth(newDate.getMonth() + (direction === 'left' ? -1 : 1));
			setCurrentDate(newDate);
			setMonth(monthNames[newDate.getMonth()]);
			setYear(newDate.getFullYear());
			inputElementRef.value = newDate.getFullYear();
		}
	};

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

	var daysArray = [];
	var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var previousMonthsDays = [];
	updateGrid();

	function updateGrid() {
		const daysInMonth = () => {
			const year = selectedYear;
			const month = currentDate.getMonth(); // Months are zero-indexed
			return new Date(year, month, 0).getDate();
		};

		// Create an array of day numbers for the current month
		daysArray = Array.from({ length: daysInMonth() }, (_, index) => index + 1);

		// Get the first day of the current month
		const firstDayOfMonth = new Date(selectedYear, monthNames.indexOf(selectedMonth), 1);
		previousMonthsDays = [];

		// If day of the week is not Sunday
		if (firstDayOfMonth.getDay() != 0) {
			// Create an array of day numbers for the previous month
			let daysToCount = firstDayOfMonth.getDay();
			let lastDayOfLastMonth = new Date(selectedYear, monthNames.indexOf(selectedMonth), 1, -1);

			for (; daysToCount > 0; daysToCount--) {
				previousMonthsDays.unshift(lastDayOfLastMonth.getDate());
				lastDayOfLastMonth.setHours(-24);
			}
		}
	}

	const handleYearChange = (e) => {
		var value = e.target.value;
		var length = e.target.value.length;
		const intValue = parseInt(value);
		var newDate = new Date(currentDate);

		if (length < 4) {
			return;
		}

		if (intValue >= 2023 && intValue <= 5000) {
			// Prevent setting the year to past years
			if (
				newDate.getFullYear() === new Date().getFullYear() &&
				intValue < new Date().getFullYear()
			) {
				newDate.setFullYear(new Date().getFullYear());
			} else {
				newDate.setFullYear(intValue);
			}

			// If the selected year is the current year and the selected month is less than the current month, set the month to the current month
			if (intValue === new Date().getFullYear() && newDate.getMonth() < new Date().getMonth()) {
				newDate.setMonth(new Date().getMonth());
			}

			setYear(intValue);
			setCurrentDate(newDate);
		} else if (intValue > 5000) {
			newDate.setFullYear(5000);
			// If the selected year is in the future, set the month to the current month
			if (newDate.getMonth() < new Date().getMonth()) {
				newDate.setMonth(new Date().getMonth());
			}
			setYear(5000);
			setCurrentDate(newDate);
			e.target.value = 5000;
		} else {
			if (
				newDate.getMonth() < new Date().getMonth() &&
				newDate.getFullYear() > new Date().getFullYear()
			) {
				newDate.setMonth(new Date().getMonth());
			}
			newDate.setFullYear(new Date().getFullYear());
			setYear(newDate.getFullYear());
			setCurrentDate(newDate);
		}
		setMonth(monthNames[newDate.getMonth()]);
	};

	useEffect(() => {
		// Access the inputElement using the ref after the component has been rendered
		const inputElement = inputElementRef.current;
		if (inputElement) {
			inputElement.value = selectedYear;
		}
		updateGrid();
	}, [selectedYear, currentDate]);

	return (
		<section className='flex flex-col w-full h-full pb-4 justify-center items-center bg-white rounded-b-md'>
			<div className='flex flex-col w-fit items-center justify-center '>
				{/* Header */}
				<div className='flex flex-row space-x-5'>
					<div
						onClick={() => handleMonthChange('left')}
						className={`${
							currentDate.getMonth() - 1 >= new Date().getMonth() ||
							currentDate.getFullYear() > new Date().getFullYear()
								? 'visible'
								: 'invisible'
						} flex items-center`}>
						<FaArrowLeft
							className='text-zinc-800 hover:scale-125 transition-all duration-300 active:scale-100 active:duration-100 hover:cursor-pointer'
							size={12}
						/>
					</div>
					<div className='flex flex-col items-center justify-center py-2'>
						<h2 className='header text-zinc-800 header text-[16px] w-[8rem] text-center select-none'>
							{selectedMonth}
						</h2>
						<input
							className='subtext text-zinc-800 subtext placeholder:text-zinc-800 bg-transparent text-center text-[12px] focus:outline-none'
							onChange={(e) => handleYearChange(e)}
							placeholder={selectedYear}
							ref={inputElementRef}></input>
					</div>
					<div
						onClick={() => handleMonthChange('right')}
						className='flex items-center'>
						<FaArrowRight
							className='text-zinc-800 hover:scale-125 transition-all duration-300 active:scale-100 active:duration-100 hover:cursor-pointer'
							size={12}
						/>
					</div>
				</div>
				<div className='line mb-2 rounded-sm border-zinc-300/75 border-t-2 w-[75%]'></div>

				<div className='grid grid-cols-7 gap-1 w-full text-center rounded-md '>
					{/* Day Labels */}
					{daysOfWeek.map((day, index) => (
						<span
							className='text-zinc-800 text-[13px]  header'
							key={index}>
							{day}
						</span>
					))}
				</div>
			</div>
			<div className='flex h-fit items-center justify-center'>
				<MonthlyCalendarGrid
					previousMonthsDays={previousMonthsDays}
					daysArray={daysArray}
					currentDate={currentDate}
					bgColor={'bg-zinc-300'}
					textColor={'text-zinc-200'}
					color={'bg-zinc-400'}
					interactable={true}
					setDay={setDay}
					selectedDay={selectedDay}
				/>
			</div>
		</section>
	);
}
